import {
  checkOtpExist,
  validateOtp,
  addNotificationData,
  deleteOtp,
  sendOnBoardingMail
} from './otp.helper';

async function requestForOtp(call, callBack) {
  const res: any = await checkOtpExist(call.request);
  callBack(null, {
    status: res.statusCode,
    message: res.message,
    otp: res.otp
  });
}
async function requestForValidateOtp(call, callBack) {
  const res: any = await validateOtp(call.request);
  callBack(null, { status: res.statusCode, message: res.message });
}
async function sendNotification(call, callBack) {
  const res: any = await addNotificationData(call.request);
  callBack(null, { status: res.statusCode, message: res.message });
}
async function sendWelcomeMail(call, callBack) {
  console.warn(call.request,"call request in send welcome mail");
  
  const res: any = await sendOnBoardingMail(call.request);
  callBack(null, { status: res.statusCode, message: res.message });
}

async function requestForDeleteOtp(call, callBack) {
  const res: any = await deleteOtp(call.request);
  callBack(null, { status: res.statusCode, message: res.message });
}
export {
  requestForOtp,
  requestForValidateOtp,
  sendNotification,
  requestForDeleteOtp,
  sendWelcomeMail
};
