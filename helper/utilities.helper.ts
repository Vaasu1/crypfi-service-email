/* eslint-disable no-restricted-syntax */

/**
 * This function will convert minutes to milliseconds
 * @author Priyanka
 * @param minutes {number}
 * @returns number
 */
export function convertMinutestoMilliSeconds(minutes) {
  return Math.floor(minutes * 60 * 1000);
}
/**
 * This function will return the difference time from now to otp sent_at
 * @author Priyanka
 * @param currentTime {number}
 * @param otpTime {number}
 * @returns number
 */
export function findDifference(otpTime, currentTime) {
  return Math.floor(currentTime - otpTime);
}
/**
 * This function will generate random no. of otp based on the length passed
 * @author Priyanka
 * @param digits
 * @returns
 */
export function generateOtp(digits) {
  let multiplyRange = '0'.repeat(digits - 1);
  let addRange = '0'.repeat(digits - 1);
  addRange = 1 + addRange;
  multiplyRange = 9 + multiplyRange;
  const otp = Math.floor(
    Number(addRange) + Math.random() * Number(multiplyRange)
  );
  return otp;
}
// eslint-disable-line  no-restricted-syntax
export async function ReplaceData(teplate: string, replaceData: any) {
  let tempData = teplate;
  for (const data of replaceData) {
    tempData = await tempData.replace(data.key, data.replaceWith); // eslint-disable-line no-await-in-loop
  }
  return tempData;
}
