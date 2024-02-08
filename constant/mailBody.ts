import * as path from 'path';

const template = path.join(path.resolve(), '/src/views/welcome-message.ejs');
const welcomeMsgTemplate = path.join(path.resolve(), '/src/views/onboard-message-crypfi.ejs');
const LOGIN = {
  SUBJECT: `Authorize New Device`,
  TEMPLATE: template,
  HTMLTEXT: `<p>You recently attempted to sign in to your ${process.env.PROJECT_NAME} account from a new device or location. As a security measure, we require additional confirmation before allowing access to your ${process.env.PROJECT_NAME} account.</p>
    <table><tr><td style="border:1px solid black; padding:5px">Location:</td><td style="border:1px solid black; padding:5px">{{location}}<td></tr>
      <tr><td style="border:1px solid black; padding:5px">IP Address:</td><td style="border:1px solid black; padding:5px">{{ip}}</td></tr>
      <tr><td style="border:1px solid black; padding:5px">Device:</td><td style="border:1px solid black; padding:5px">{{device}}</td></tr></table>
    <p>If you recognize this activity, please confirm it with the activation code. Here is your account activation code:</p>
    <h3>{{code}}</h3>
    <p>The verification code will be valid for 30 minutes. Please do not share this code with anyone.</p>
    If you don't recognize this activity, please disable your account and contact our customer support immediately at <a href="{{support}}">Site</a>`
};
const WELCOME_MESSAGE = {
  SUBJECT: `Welcome to Crypfi`,
  TEMPLATE: welcomeMsgTemplate,
  HTMLTEXT: `<tr>
  <td style="text-align: center; padding: 30px 15px 0 15px">
    <img
      src="./images/verified_mail.png"
      alt="naut_img"
      style="max-width: 100%"
      class="main-img"
    />
    <h2
      style="
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        color: #c4c6c7;
        margin: 0 auto;
        max-width: 435px;
        padding-top: 30px;
        display: block;
      "
    >
      <strong style="color: #ff5f00">Hi {{username}},</strong>
    </h2>
    <p
      style="
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #141416;
        margin: 0 auto;
        max-width: 430px;
        padding-top: 20px;
        padding-bottom: 12px;
        display: block;
      "
    >
      Thank you for choosing to join us as a beta user!
    </p>
    <p
      style="
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #141416;
        margin: 0 auto;
        max-width: 430px;

        padding-bottom: 12px;
        display: block;
      "
    >
      We all welcome you to the CrpFi, your gateway to a
      revolutionary financial experience with the advantages of
      both centralized and decentralized exchange.
    </p>
    <p
      style="
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #141416;
        margin: 0 auto;
        max-width: 430px;

        padding-bottom: 12px;
        display: block;
      "
    >
      We're excited to have you on board as a valued beta user.
      This exclusive opportunity will allow you to be among the
      first to test drive CrpFi's latest features and
      enhancements.
    </p>
    <p
      style="
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #141416;
        margin: 0 auto;
        max-width: 430px;

        padding-bottom: 12px;
        display: block;
      "
    >
      Stay tuned for updates regarding our TestNet release. As a
      beta user, you'll receive early access, ensuring you're at
      the forefront of our exciting developments.
    </p>
    <p
      style="
        font-family: Arial, Helvetica, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #141416;
        margin: 0 auto;
        max-width: 430px;

        padding-bottom: 12px;
        display: block;
      "
    >
      Thank you. We look forward to embarking on this journey
      together.
    </p>
  </td>
</tr>`
};
const ONBOARD = {
  SUBJECT: 'Confirm Your Registration',
  TEMPLATE: template,
  HTMLTEXT: `Welcome to ${process.env.PROJECT_NAME}<br><br>
    Here is your account activation code:<br>
    <h4 style="color:orange">{{code}}</h4>
    Security Tips:
    <ul><li>Never give your password to anyone.</li>
      <li>Never call any phone number for someone claiming to be ${process.env.PROJECT_NAME} Support.</li>
      <li>Never send any money to anyone claiming to be a member of the ${process.env.PROJECT_NAME} team.</li>
      <li>Enable Google Two Factor Authentication.</li>
      <li>Bookmark <a href="{{siteurl}}">Site</a> use <a href="{{verifydomain}}">Verify domain</a> to verify the domain you're visiting. </li>
      </ul><br>
      <p>The verification code will be valid for 30 minutes. Please do not share this code with anyone.</p>
    If you don't recognize this activity,please contact our customer support immediately at: <a href="{{contactsupport}}">Contact Support</a>`
};
const REGISTER = {
  SUBJECT: `Welcome to ${process.env.PROJECT_NAME}, let's complete your setup!`,
  TEMPLATE: template,
  HTMLTEXT: `<p style="text-align:center"><b>Welcome to ${process.env.PROJECT_NAME}</b></p>
    Thanks for joining our community and signing up for the world's leading crytocurrency exchange. We’re on a mission to provide crypto users like you with the right education and resources to make your trading journey seamless and safe.!!<br><br>
    <p style="text-align:center"><b><u>Get started</u></b></p>
    <p style="text-align:center"><b>Few quick steps to help you get setup</b></p>
    <b>Step 1: Setup and protect your account</b>
    <ul>
      <li> Enable Two-Factor Authentication (2FA)</li>
      <li>Enable your Anti-Phishing Code: Log in to your account, head to the Account Center, and follow the instructions. This code helps you ensure that an email from Binance is genuine
      </li>
    </ul>
    <p><b><u>Verify your account</u></b></p>
    <b>Step 2: Complete Identity Verification</b>
    <ul>
      <li>Increase account security by protecting your account from any misuse</li>
      <li>Enjoy higher account limits</li>
      <li>Buy crypto </li>
    </ul>
    <p><b><u>Protect your account</b></u></p>
    <b>Step 3: Setup your ${process.env.PROJECT_NAME} Desktop App</b>
    <ul>
      <li>Faster loading times and smoother user experience for a better trading experience</li>
     <li> More secure access to ${process.env.PROJECT_NAME} without phishing or other browser-related risks</li>
      <li>  Convenient and secure log-in using QR code scanning
      </li>
    </ul>
    <p><b><u>Download here</u></b></p>
    <p style="text-align:center"><b>Over the next few days, we will be sending you communication over email and the ${process.env.PROJECT_NAME} app to help you start your crypto journey with ${process.env.PROJECT_NAME}</b></p>`
};
const RESET_SECURITY = {
  SUBJECT: `Request to Reset Security Items`,
  TEMPLATE: template,
  HTMLTEXT: `<p>Hello,<p>
    <p>You've requested to reset security items. If the reset request is successful, the system will decide whether to disable your withdrawals for 48 hours or not.</p>
    <p>To confirm your request, please use the 6-digit code below:</p>
    <h3>{{code}}</h3>
    <p>The verification code will be valid for 30 minutes. Please do not share this code with anyone.</p>
    <p>If you did not initiate this operation, click here to disable your account and then click the link below to contact ${process.env.PROJECT_NAME} Customer Service:</p>
    <a href="{{support}}">Site</a>`
};
const PASSWORD_CHANGED = {
  SUBJECT: `Password Changed`,
  TEMPLATE: template,
  HTMLTEXT: `<p>The password linked to your ${process.env.PROJECT_NAME} account has been successfully updated.</p>
    <p>You can now trade and withdraw safely.</p>
    <p>If you don't recognize this activity,please disable your account and contact our customer support immediately at <a href="{{support}}">site</a></p>`
};
const RESET_PASSWORD = {
  SUBJECT: `Reset Password`,
  TEMPLATE: template,
  HTMLTEXT: `<p>You've requested to reset the password linked with your ${process.env.PROJECT_NAME} account.</p>
    <p>Please note: After updating your password, we'll disable withdrawals for 24 hours.</p>
    <p>To confirm your request, please use the 6-digit code below:</p>
    <h3>{{code}}</h3>
    <p>The verification code will be valid for 30 minutes. Please do not share this code with anyone.</p>
    <p>If you don't recognize this activity,please disable your account and contact our customer support immediately at <a href="{{support}}">site</a></p>`
};
const KYC_BASIC_VERIFICATION = {
  SUBJECT: `Basic Verification Successful`,
  TEMPLATE: template,
  HTMLTEXT: `<p>Congratulations, you've passed the first step of your identity verification.</p>
    <p>For an overview of your account benefits, please visit the Verification Centre. To unlock more account features and increase your deposit & withdrawals limits, complete Intermediate Verification. This should take less than 5 Minutes.</p>
    <p>What do I need for Intermediate Verification?</p>
    <ul><li>Provide valid government-issued identification document(s): passport, driving licence, etc.</li>
    <li>Upload photo(s) of your ID document(s)</li>
      <li>Complete facial verification</li></ul>
    
    Read our FAQs if you are running into problems.
    <p>To make your first crypto deposit, press here to log-in to your account and navigate to the deposit page.</p>
    
    <p>If you don't recognize this activity, please contact us immediately at <a href="{{support}}">site</a></p>`
};
const KYC_LEVEL2_REJECTED = {
  SUBJECT: `Personal Verification Unsuccessful`,
  TEMPLATE: template,
  HTMLTEXT: `<p>We're sorry to inform you that your Personal Verification has been declined for the following reason(s):</p>
    <p>"{{reason}}"</p>`
};
const COMMON_EMAIL = {
  FOOTER: `<p>${process.env.PROJECT_NAME} Team</p>
    <p>This is an automated message, please do not reply.</p>`
};
export {
  REGISTER,
  LOGIN,
  ONBOARD,
  RESET_SECURITY,
  KYC_LEVEL2_REJECTED,
  PASSWORD_CHANGED,
  RESET_PASSWORD,
  KYC_BASIC_VERIFICATION,
  COMMON_EMAIL,
  WELCOME_MESSAGE
};
