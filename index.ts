/*eslint-disable */
require('dotenv').config()
import server from './grpc/server'
server;
import App from './src/app';
import logger from './winston/logger';
const app = new App();
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
import { DB } from './helper/package.helper';
const clusterEnable: any = process.env.clusterEnable == 'false' ? false : true;

if (cluster.isMaster && clusterEnable == true) {
  logger.info(`Number of CPUs is ${totalCPUs}`);
  logger.info(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    logger.info(`worker ${worker.process.pid} died`);
    logger.info("Let's fork another worker!");
    cluster.fork();
  });
} else {
  //  app.listen();
  DB.authenticate().then((res) => {
    app.listen();
  })
}