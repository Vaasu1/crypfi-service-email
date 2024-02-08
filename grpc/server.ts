// eslint-disable import/no-unresolved
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import * as MailModule from '../src/api/modules/mail/otp.controller';

const server = new grpc.Server();
const grpcIp = process.env.GRPC_HOST;
const grpcPort = process.env.GRPC_PORT;
const URL = `${grpcIp}:${grpcPort}`;
// load proto file
const proto: any = grpc.loadPackageDefinition(
  protoLoader.loadSync('./grpc/proto/mail.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);
// add methods as service in grpc server
server.addService(proto.mail.OtpService.service, {
  requestForOtp: MailModule.requestForOtp,
  requestForValidateOtp: MailModule.requestForValidateOtp,
  sendNotification: MailModule.sendNotification,
  requestForDeleteOtp: MailModule.requestForDeleteOtp,
  sendMail: MailModule.sendWelcomeMail,

});
server.bind(URL, grpc.ServerCredentials.createInsecure());
server.start();
console.log('grpc connected', URL); // eslint-disable-line no-console
export default server;
