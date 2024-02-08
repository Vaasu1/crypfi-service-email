// eslint-disable-next-line global-require

// import { DB } from '../src/api/helper/packageHelper';
import { DB } from '../helper/package.helper';
import Notification from './notification.model';
import Otp from './otp.model';

// Open database connection

// Initialize each model in the database
// This must be done before associations are made
const models = [Notification, Otp];
models.forEach((model) => model.initialize(DB));

//   force: true causes database to reset with each run

export { DB as Database, Notification, Otp };
