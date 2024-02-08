require('dotenv').config();
//console.log("process.env",process.env);
module.exports = {

  "development": {
    "username" : process.env.USER_NAME,
    "password" : process.env.PASSWORD,
    "database" : process.env.DBNAME,
    "host"     : process.env.HOST_NAME,
    "port"     : process.env.DB_PORT,
    "dialect"  : "mysql"
  },
  "test": {
    "username" : process.env.USER_NAME,
    "password" : process.env.PASSWORD,
    "database" : process.env.DBNAME,
    "host"     : process.env.HOST_NAME,
    "dialect"  : "mysql"
  },
  "production" :  {
    "username" : process.env.USER_NAME,
    "password" : process.env.PASSWORD,
    "database" : process.env.DBNAME,
    "host"     : process.env.HOST_NAME,
    "dialect"   : "mysql"
  }
}
