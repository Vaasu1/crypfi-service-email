import * as Helpers from '@antiers/product-package';
import { Sequelize } from 'sequelize';
const nodemailer = require("nodemailer"); // Require the Nodemailer package
import * as path from 'path';

const welcomeMsgTemplate = path.join(path.resolve(), '/src/views/onboard-message-crypfi.ejs');


let jwtMiddleware;
let DB;
let Redis;
let Mail;
let Kafka;
// let TwilioHelper;
let ApiErrors;
let ExceptionHandler;
const redisCredentials = {
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  auth: process.env.REDIS_AUTH,
  jwtsecret: process.env.JWTSECRET,
  redisUserTokenDb: '0'
};

const dbCredentials = {
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
  port: process.env.DB_PORT,
  timezone: 'Z'
};
console.warn(dbCredentials, "dbCredentials !!!!!!");

// const mailCredentials = {
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   user: process.env.SMTP_USER,
//   from: process.env.SMTP_FROM,
//   secure: false,
//   password: process.env.SMTP_PASSWORD
// };
const mailCredentials = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  user: process.env.SMTP_USER,
  from: process.env.SMTP_FROM,
  secure: process.env.SMTP_SECURE,
  password: process.env.SMTP_PASSWORD
};

// const kafkaCrednetials = {
//   clientId: 'test',
//   brokers: ['localhost:9092']
// }
const twilioCredentials = {
  accountId: process.env.TWILIO_ACCOUNT_ID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  fromNumber: process.env.TWILIO_NUMBER
};

const InitConnection = async () => {
  Redis = new Helpers.redisHelper(redisCredentials);
  ApiErrors = Helpers.ApiErrors;
  ExceptionHandler = Helpers.ExceptionHandler;

  DB = new Sequelize({
    dialect: 'mysql',
    host: dbCredentials.host,
    username: dbCredentials.user,
    password: dbCredentials.password,
    database: dbCredentials.database,
    port: Number(process.env.DB_PORT),
    pool: {
      max: 20,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    },
  });
   Mail = new Helpers.MailHelper(mailCredentials);
  // TwilioHelper = new Helpers.TwilioHelper(twilioCredentials);
};

// async function main() {
//   // SMTP config
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mandrillapp.com", //
//     port: 587,
//     auth: {
//       user: "pranav@crypfi.io", // Your Ethereal Email address
//       pass: "md-UXQqOeZ1dGfrWfOGjGiiJw", // Your Ethereal Email password
//     },
//   }); // Send the email
//   let info = await transporter.sendMail({
//     from: 'info@crypfi.io',
//     to: "shreyasingh1997.ss@gmail.com                                ", // Test email address
//     subject: "Welcome to Crypfi 3 20Sept",
//     template: welcomeMsgTemplate,
//     text: "Sample mail - Code is working 2 !! ",
//     html: `<tr>
//     <td style="text-align: center; padding: 30px 15px 0 15px">
//       <img
//         src="./images/verified_mail.png"
//         alt="naut_img"
//         style="max-width: 100%"
//         class="main-img"
//       />
//       <h2
//         style="
//           font-family: Arial, Helvetica, sans-serif;
//           font-style: normal;
//           font-weight: 700;
//           font-size: 16px;
//           line-height: 24px;
//           text-align: center;
//           color: #c4c6c7;
//           margin: 0 auto;
//           max-width: 435px;
//           padding-top: 30px;
//           display: block;
//         "
//       >
//         <strong style="color: #ff5f00">Hi,</strong>
//       </h2>
//       <p
//         style="
//           font-family: Arial, Helvetica, sans-serif;
//           font-style: normal;
//           font-weight: 400;
//           font-size: 14px;
//           line-height: 24px;
//           text-align: center;
//           color: #141416;
//           margin: 0 auto;
//           max-width: 430px;
//           padding-top: 20px;
//           padding-bottom: 12px;
//           display: block;
//         "
//       >
//         Thank you for choosing to join us as a beta user!
//       </p>
//       <p
//         style="
//           font-family: Arial, Helvetica, sans-serif;
//           font-style: normal;
//           font-weight: 400;
//           font-size: 14px;
//           line-height: 24px;
//           text-align: center;
//           color: #141416;
//           margin: 0 auto;
//           max-width: 430px;
  
//           padding-bottom: 12px;
//           display: block;
//         "
//       >
//         We all welcome you to the CrpFi, your gateway to a
//         revolutionary financial experience with the advantages of
//         both centralized and decentralized exchange.
//       </p>
//       <p
//         style="
//           font-family: Arial, Helvetica, sans-serif;
//           font-style: normal;
//           font-weight: 400;
//           font-size: 14px;
//           line-height: 24px;
//           text-align: center;
//           color: #141416;
//           margin: 0 auto;
//           max-width: 430px;
  
//           padding-bottom: 12px;
//           display: block;
//         "
//       >
//         We're excited to have you on board as a valued beta user.
//         This exclusive opportunity will allow you to be among the
//         first to test drive CrpFi's latest features and
//         enhancements.
//       </p>
//       <p
//         style="
//           font-family: Arial, Helvetica, sans-serif;
//           font-style: normal;
//           font-weight: 400;
//           font-size: 14px;
//           line-height: 24px;
//           text-align: center;
//           color: #141416;
//           margin: 0 auto;
//           max-width: 430px;
  
//           padding-bottom: 12px;
//           display: block;
//         "
//       >
//         Stay tuned for updates regarding our TestNet release. As a
//         beta user, you'll receive early access, ensuring you're at
//         the forefront of our exciting developments.
//       </p>
//       <p
//         style="
//           font-family: Arial, Helvetica, sans-serif;
//           font-style: normal;
//           font-weight: 400;
//           font-size: 14px;
//           line-height: 24px;
//           text-align: center;
//           color: #141416;
//           margin: 0 auto;
//           max-width: 430px;
  
//           padding-bottom: 12px;
//           display: block;
//         "
//       >
//         Thank you. We look forward to embarking on this journey
//         together.
//       </p>
//     </td>
//   </tr>`,
//   });
//   console.log("Message sent: %s !!", info.messageId); // Output message ID
//   console.log("View email: %s !! ", nodemailer.getTestMessageUrl(info)); // URL to preview email
// }
// // Catch any errors and output them to the console
// main().catch(console.error);

InitConnection();

export {
  DB,
  Redis,
  jwtMiddleware,
  Mail,
  Kafka,
  // TwilioHelper,
  ApiErrors,
  ExceptionHandler
};
