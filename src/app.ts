import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import helmet from 'helmet';
// import * as morgan from 'morgan';
/* import * as fs from 'fs';
import * as path from 'path'; */
import * as fileUpload from 'express-fileupload';
import CronService from './cron/mail'
import KafkaHelper from '../helper/kafkaHelper';
import  {setAnnouncementdData} from '../src/api/modules/notification.helper'


import {
  morgan,
  ErrorMiddleware,
  ExceptionHandler,
  montiorThemeCSS
} from '@antiers/product-package';
import errorMiddleware from './api/middlewares/global/error.middleware';
// import ApiResponse from '../helper/apiResponse';
import logger from '../winston/logger';
// const env = process.env.NODE_ENV || 'development';
const statusMonitor = require('express-status-monitor')({
  title: 'Email Service Status',
  theme: montiorThemeCSS,
  path: '/monitor',
  spans: [
    {
      interval: 1, // Every second
      retention: 60 // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60
    }
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true
  }
});

const auth = require('http-auth');

const basic = auth.basic(
  { realm: 'Monitor Area' },
  function (user, pass, callback) {
    callback(user === 'a1' && pass === 'a1');
  }
);

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.get('/monitor', basic.check(statusMonitor.pageRoute));
    this.app.use(statusMonitor.middleware);
    this.uploadSettings();
    // this.getProcessInfo();
    // ErrorMiddleware.unCaughtException();
    // ErrorMiddleware.unHandelPromiseRejection();
    this.initializeMiddlewares();
  }

  public listen() {
    this.app.listen(process.env.PORT ? process.env.PORT : 3005, () => {
      logger.info(
        `App listening on the port ${
          process.env.PORT ? process.env.PORT : 3005
        }`
      );
      // console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
    CronService;
    KafkaHelper;
    setAnnouncementdData();

  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // this.app.use(
    //   morgan(function (tokens, req, res) {
    //     return [
    //       tokens.method(req, res),
    //       tokens.url(req, res),
    //       tokens.status(req, res),
    //       tokens.res(req, res, 'content-length'),
    //       '-',
    //       tokens['response-time'](req, res),
    //       'ms'
    //     ].join(' ');
    //   })
    // );
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(morgan);
    this.app.use(cors());
    this.app.get('/notification/health', (req, res) => {
      logger.info('Status Route called');
      return res.json({ status: 'success ...' });
    });
    
    /* provide 404 response if no routes match */
    // this.app.use(ApiResponse.error404);
    this.app.use(ExceptionHandler.EndPointNotFound);

    this.initializeErrorHandling();
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private uploadSettings() {
    this.app.use(fileUpload());
  }
}

export default App;
