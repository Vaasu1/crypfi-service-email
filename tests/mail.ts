import * as chai from 'chai';
// import { checkOtpExist } from '../src/api/modules/mail/otp.helper'
import { generateOtp } from '../helper/utilities.helper';

const should = chai.should(); // eslint-disable-line no-unused-vars
// const expect = chai.expect;
// var assert = chai.assert;
// const sendOtp = {
//     username: 'priyanka.giri@antiersolutions.com',
//     type: 'EMAIl',
//     service:'Login'
// }
describe('mail service function', () => {
  it('it should return otp with metioned length', (done) => {
    const otp: any = generateOtp(6).toString();
    otp.should.have.length(6);
    done();
  });
  // ,
  // it('it should sendOtp', async () => {
  //     const data = await checkOtpExist(sendOtp);
  //     console.log("data",data)
  //     // done();
  // })
});
