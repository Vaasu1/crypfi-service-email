/*eslint-disable */
// import { Mail, TwilioHelper } from '../../../../helper/package.helper'
import { Mail } from '../../../../helper/package.helper'
import { Notification, Otp } from '../../../../models/index'
import { OTP_MESSAGES } from '../../../../constant/responseMessages';
import RESPONSE_CODES from '../../../../constant/responseCode';
import { Integer } from 'aws-sdk/clients/apigateway';
//import CronService from '../../../cron/mail'
import * as MailTemplate from '../../../../constant/mailBody';
import { convertMinutestoMilliSeconds, ReplaceData, generateOtp, findDifference } from '../../../../helper/utilities.helper'
import { OTP, SERVICES, NOTIFICATION_TYPE, URL } from "../../../../constant/common"
//CronService;

/**
 * This fucntion check for otp and insert/update in db
 * @author Priyanka
 * @param data {object} 
 * @returns { statuscode,message}
 */
async function checkOtpExist(data) {
    const { username, type, service } = data
    let otpDigits = data.otp;
    const whereCondition = { where: { username: username, service: service } }
    const otpExist = await Otp.findAll(whereCondition)
    const otp = generateOtp(otpDigits);
    if (!otpExist.length) {
        await Otp.create({ username, otp, service })
    } else {
        await Otp.destroy(whereCondition);
        await Otp.create({ username, otp, service })
    }
    const content = { otp: otp, service: service };
    await Notification.create({ username, type, content })
    let message;
    if (type === NOTIFICATION_TYPE.EMAIL) {
        message = OTP_MESSAGES.EMAIL_SENT
    } else {
        message = OTP_MESSAGES.OTP_SENT
    }
    return { statusCode: RESPONSE_CODES.SUCCESS, message: message, otp: otp }
}
async function addNotificationData(request) {
    const { username, type, service } = request;
    let content = request.content;
    // const content = { otp: null, service: service };
    content = JSON.parse(content)
    if (content.otp !== null) {
        let otpDigits = content.otp;
        const whereCondition = { where: { username: username, service: service } }
        const otpExist = await Otp.findAll(whereCondition)
        const otp = generateOtp(otpDigits);
        if (!otpExist.length) {
            await Otp.create({ username, otp, service })
        } else {
            await Otp.destroy(whereCondition);
            await Otp.create({ username, otp, service })
        }
        content.otp = otp;
    }
    content.service = service;
    await Notification.create({ username, type, content })
    let message;
    if (type === NOTIFICATION_TYPE.EMAIL) {
        message = OTP_MESSAGES.EMAIL_SENT
    } else {
        message = OTP_MESSAGES.OTP_SENT
    }
    return { statusCode: RESPONSE_CODES.SUCCESS, message: message }
}

/**
 * This function checks either otp expired or not
 * @param otpDate {string}
 * @param otp {string}
 * @returns {boolean}
 */
function checkOtpExpiry(otpDate: string, otp: string) {
    let otpTime = new Date(otpDate).getTime()
    let currentTime: number = new Date().getTime()
    const milliseconds = convertMinutestoMilliSeconds(OTP.EXPIRE_TIME);
    const timeleft = findDifference(otpTime, currentTime);
    if (timeleft < milliseconds) {
        return false;
    } else {
        return true;
    }
}

/**
 * This function validate otp for particular user and service
 * @author Priyanka
 * @param data {object} 
 * @returns {statusCode,messgae}
 */
async function validateOtp(data) {
    const { otp, username, service } = data
    const whereCondition = { where: { service: service, username: username } }
    let otpExist: any = await Otp.findAll(whereCondition)
    if (otpExist.length) {
        otpExist = otpExist[0];
        if (otpExist.retry_count >= OTP.RETRY_COUNT && otpExist.otp !== parseInt(otp)) {
            await Otp.destroy(whereCondition);
            return {
                statusCode: RESPONSE_CODES.BADREQUEST,
                message: OTP_MESSAGES.OTP_LIMIT_EXCEEDED
            };
        }
        const isExpired: boolean = checkOtpExpiry(otpExist.created_at, otp);
        if (isExpired) {
            await Otp.destroy(whereCondition);
            return {
                statusCode: RESPONSE_CODES.BADREQUEST,
                message: OTP_MESSAGES.OTP_EXPIRED
            };
        }
        if (otpExist.otp === Number(otp)) {
            // await Otp.destroy(whereCondition);
            return {
                statusCode: RESPONSE_CODES.SUCCESS,
                message: OTP_MESSAGES.OTP_VERIFIED
            };
        }
        else {
            await Otp.update(
                { retry_count: otpExist.retry_count + 1 },
                whereCondition
            );
            return {
                statusCode: RESPONSE_CODES.BADREQUEST,
                message: OTP_MESSAGES.OTP_INVALID
            }
        }
    } else {
        return {
            statusCode: RESPONSE_CODES.BADREQUEST,
            message: OTP_MESSAGES.OTP_NOT_EXIST
        };
    }
}
/**
 * This function will send email to user
 * @author Priyanka
 * @param id {Integer}
 * @param otp {Integer}
 * @param to {string}
 * @param content {object}
 * @param serviceName {string}
 */
async function sendMail(id: Integer, otp: Integer, to: string, content: any, serviceName: string) {
    try {
        const mailData: any = await getTemplateContent(serviceName, content);
        const mailSent = await Mail.sendMail(to, mailData.subject, mailData.body, MailTemplate.COMMON_EMAIL.FOOTER, mailData.template);
        const whereCondition = { where: { id: id } };
        if (mailSent) {
            await Notification.update({ status: 'SENT' }, whereCondition)
        } else {
            await Notification.update({ status: 'FAILED' }, whereCondition)
        }
    } catch (error) {
        return error;
    }
}

async function sendOnBoardingMail(request:any) {
    try {
        console.warn("inside send on boarding mail!!!!!!++++++++++++==",request);
        
        const {  service, username, email } = request;
        const mailData: any = await getWelcomeMailTemplateContent( username);
        const mailSent = await Mail.sendMail(email, mailData.subject, mailData.body, MailTemplate.COMMON_EMAIL.FOOTER, mailData.template);
        
        console.warn("mail sent", mailSent);
        return { status: '200', message: "Mail sent sucessfull" };
        
    } catch (error:any) {
        console.log('error', error);
        return { status: '400', message: error.message };
    }
}

async function getTemplateContent(serviceName, content) {
    if (serviceName.toUpperCase() === SERVICES.ONBOARD) {
        const code = content.otp;
        const replaceObj: any = [
            { replaceWith: code, key: "{{code}}" },
            { replaceWith: process.env.FRONT_END, key: "{{siteurl}}" },
            { replaceWith: URL.VERIFY_DOMAIN, key: "{{verifydomain}}" },
            { replaceWith: URL.CONTACT_SUPPORT, key: "{{contactsupport}}" }
        ];
        const replaceData = await ReplaceData(MailTemplate.ONBOARD.HTMLTEXT, replaceObj);
        return { subject: MailTemplate.ONBOARD.SUBJECT, body: replaceData, template: MailTemplate.ONBOARD.TEMPLATE }
    }
    if (serviceName.toUpperCase() === SERVICES.BASICKYC) {
        // const replaceData = await ReplaceData(ONBOARD.HTMLTEXT, replaceObj);
        return { subject: MailTemplate.KYC_BASIC_VERIFICATION.SUBJECT, body: MailTemplate.KYC_BASIC_VERIFICATION.HTMLTEXT, template: MailTemplate.KYC_BASIC_VERIFICATION.TEMPLATE }
    }
    if (serviceName.toUpperCase() === SERVICES.RESET_PASSWORD || serviceName.toUpperCase() === SERVICES.FORGOT_PASSWORD) {
        const code = content.otp;
        const replaceObj: any = [
            { replaceWith: code, key: "{{code}}" }
        ]
        const replaceData = await ReplaceData(MailTemplate.RESET_PASSWORD.HTMLTEXT, replaceObj);
        return { subject: MailTemplate.RESET_PASSWORD.SUBJECT, body: replaceData, template: MailTemplate.RESET_PASSWORD.TEMPLATE }
    }
    if (serviceName.toUpperCase() === SERVICES.PASSWORD_CHANGED) {
        return { subject: MailTemplate.PASSWORD_CHANGED.SUBJECT, body: MailTemplate.PASSWORD_CHANGED.HTMLTEXT, template: MailTemplate.PASSWORD_CHANGED.TEMPLATE }
    }
    if (serviceName.toUpperCase() === SERVICES.KYC_LEVEL2_REJECTED) {
        const reason = content.reason.toUpperCase();
        const replaceObj: any = [
            { replaceWith: reason, key: "{{reason}}" }
        ]
        const replaceData = await ReplaceData(MailTemplate.KYC_LEVEL2_REJECTED.HTMLTEXT, replaceObj);
        return { subject: MailTemplate.KYC_LEVEL2_REJECTED.SUBJECT, body: replaceData, template: MailTemplate.KYC_LEVEL2_REJECTED.TEMPLATE }
    }
    if (serviceName.toUpperCase() === SERVICES.RESET_SECURITY) {
        const code = content.otp;
        const replaceObj: any = [
            { replaceWith: code, key: "{{code}}" }
        ]
        const replaceData = await ReplaceData(MailTemplate.RESET_SECURITY.HTMLTEXT, replaceObj);
        return { subject: MailTemplate.RESET_SECURITY.SUBJECT, body: replaceData, template: MailTemplate.RESET_SECURITY.TEMPLATE }
    } if (serviceName.toUpperCase() === SERVICES.LOGIN) {
        const { otp, ipAddress, location, browser, os } = content;
        const device = browser + " " + os
        const replaceObj: any = [
            { replaceWith: otp, key: "{{code}}" },
            { replaceWith: ipAddress, key: "{{ip}}" },
            { replaceWith: location, key: "{{location}}" },
            { replaceWith: device, key: "{{device}}" },
        ]
        const replaceData = await ReplaceData(MailTemplate.LOGIN.HTMLTEXT, replaceObj);
        return { subject: MailTemplate.LOGIN.SUBJECT, body: replaceData, template: MailTemplate.LOGIN.TEMPLATE }
    } else {
        const code = content.otp;
        // const replaceObj: any = [
        //     { replaceWith: code, key: "{{code}}" },
        //     { replaceWith: 'www.bitbubble.com ', key: "{{siteurl}}" },
        //     { replaceWith: 'https://www.bitbubble.com/en/official-verification', key: "{{verifydomain}}" },
        //     { replaceWith: 'https://www.bitbubble.com/en/support', key: "{{contactsupport}}" }
        // ];
        // const replaceData = await ReplaceData(REGISTER.HTMLTEXT, replaceObj);
        return { subject: MailTemplate.REGISTER.SUBJECT, body: MailTemplate.REGISTER.HTMLTEXT, template: MailTemplate.REGISTER.TEMPLATE }
    }
}

async function getWelcomeMailTemplateContent(username) {

        const replaceObj: any = [
            { replaceWith: username, key: "{{username}}" },
        ]
        const replaceData = await ReplaceData(MailTemplate.WELCOME_MESSAGE.HTMLTEXT, replaceObj);
        return { subject: MailTemplate.WELCOME_MESSAGE.SUBJECT, body: replaceData, template: MailTemplate.WELCOME_MESSAGE.TEMPLATE }
}

/**
 * This function will send otp to user
 * @author Priyanka
 * @param id {Integer}
 * @param otp {Integer}
 * @param to {string}
 * @param content {object}
 * @param serviceName {string}
 */
async function sendOtp(id: Integer, otp: Integer, to: string, content: any, serviceName: string) {
    // const whereCondition = { where: { id: id } };
    // const smsSent = await TwilioHelper.sendMessage(to, content)
    // if (smsSent) {
    //     await Notification.update({ status: 'SENT' }, whereCondition)
    // } else {
    //     await Notification.update({ status: 'FAILED' }, whereCondition)

    // }
}
/**
 * This function checks type of notification you want to send email/sms
 * @author Priyanka
 * @param data {object}
 * 
 */
async function checktype(data) {
    const { id, username, type } = data
    let { content, otp } = data;
    //content = JSON.parse(content)
    if (type.toUpperCase() === NOTIFICATION_TYPE.EMAIL) {
        sendMail(id, otp, username, content, content.service);
    } else {
        sendOtp(id, otp, username, content, content.service);
    }
}

/**
 * This function delete otp from table
 */
async function deleteOtp(data) {
    const { username, service } = data
    const whereCondition = { where: { username, service } };
    await Otp.destroy(whereCondition);
    return {
        statusCode: RESPONSE_CODES.SUCCESS,
        message: OTP_MESSAGES.OTP_DELETED
    };
}

export {
    checktype,
    checkOtpExist,
    validateOtp,
    addNotificationData,
    deleteOtp,
    sendMail,
    sendOnBoardingMail
}