import moment = require('moment');
import * as commonPackage from '../../../helper/package.helper';
import * as DbModel from '../../../models/index';
import * as sequelize from 'sequelize';
import { REDIS_KEYS } from '../../../constant/common';
import { json } from 'body-parser';
import * as GLOBAL_CONSTANTS from '../../../constant/common';

import kafkaHelper from '../../../helper/kafkaHelper';
import RESPONSE_CODES from '../../../constant/responseCode';
import { KAFKA_EVENTS_TYPES } from '../../../constant/events';

export const createNotification = async (eventData: any) => {
  console.warn('New graph code data implements', eventData);
  return new Promise(async (resolve, reject) => {
    try {
      await DbModel.Notification.create({
        user_id: eventData.userId,
        title: eventData.title,
        description: eventData.description,
        notification_type: eventData.type
      });
      await setAnnouncementdData();
      return resolve(true);
    } catch (error) {
      console.log('error', error);
      return reject(error);
    }
  });
};

export const setAnnouncementdData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data: any = await DbModel.Database.query(
        `SELECT id,title,description,created_at FROM ${GLOBAL_CONSTANTS.DB_NAME.EMAIL_SERVICE}.${GLOBAL_CONSTANTS.TABLE_NAME.NOTIFICATION} WHERE notification_type =1 ORDER BY id DESC LIMIT 10`,
        {
          type: sequelize.QueryTypes.SELECT
        }
      );
      await commonPackage.Redis.setString(
        REDIS_KEYS.ANNOUNCEMENT,
        JSON.stringify(data),
        0,
        '0'
      );
      return resolve(true);
    } catch (error) {
      console.log('error', error);
      return reject(error);
    }
  });
};
