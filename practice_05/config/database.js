const mysql = require('promise-mysql');

const dbConfig = {
  host: 'sopt26.c3ekdk9ns8mr.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'wngoi0p!!',
  database: 'sopt26',
};

module.exports = mysql.createPool(dbConfig);
