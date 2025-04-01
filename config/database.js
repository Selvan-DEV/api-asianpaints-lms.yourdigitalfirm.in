const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tutorial-app-db'
});

// const pool = mysql.createPool({
//   host: 'turntable.proxy.rlwy.net',
//   user: 'root',
//   password: 'fPUkYJoRrenwmSlNRxCztTxVJOeSUTVC',
//   database: 'railway',
//   port: 10244
// });

module.exports = pool.promise();