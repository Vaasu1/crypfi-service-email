import * as GLOBAL_CONSTANTS from '../../../../../constant/common';
import * as Interface from '../interface';
import * as DbModel from '../../../../../models/index';
import {KAFKA_EVENTS_TYPES} from '../../../../../constant/events';
import * as NotificationHelper from '../../notification.helper';


import * as commonPackage from '../../../../../helper/package.helper';


class KafkaHelperConsume {
  constructor() {
    this.startServer();
  }

  public async startServer() {
  }

  public async createNotification(eventData: any) {
    /* eslint-disable no-useless-catch */
    try {
      console.warn('eventData',eventData)

      await NotificationHelper.createNotification(eventData);
      return true;
    } catch (error) {
     console.log("error in pair list",{metadata:{error}});
      throw error;
    }
  }
 
}

export default new KafkaHelperConsume();
