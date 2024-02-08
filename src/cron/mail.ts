/* eslint-disable import/no-cycle, no-console, no-new */
import * as cron from 'cron';
import { Notification } from '../../models';
import { checktype } from '../api/modules/mail/otp.helper';
import logger from '../../winston/logger';

const cluster = require('cluster');

const clusterEnable: any = process.env.clusterEnable !== 'false';
let i;
const { CronJob } = cron;
class CronService {
  constructor() {
    logger.info(':: CRON STARTED ::');
    if (cluster.isMaster && clusterEnable === true) {
      this.sendMail();
    } else if (cluster.isMaster && clusterEnable === false) {
      this.sendMail();
    }
  }

  sendMail() {
    new CronJob(
      '*/10 * * * * *',
      async () => {
        i = 0;
        this.getPendingMails();
      },
      null,
      true,
      'America/Los_Angeles'
    );
  }

  getPendingMails = async () => {
    const mailData = await Notification.findAll({
      where: { status: 'PENDING' }
    });
    while (i < mailData.length) {
      checktype(mailData[i]);
      i += 1;
    }
  };
}
export default new CronService();
