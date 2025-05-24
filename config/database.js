const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'tutorial-app-db'
// });

// const pool = mysql.createPool({
//   host: 'turntable.proxy.rlwy.net',
//   user: 'root',
//   password: 'fPUkYJoRrenwmSlNRxCztTxVJOeSUTVC',
//   database: 'railway',
//   port: 10244
// });

const pool = mysql.createPool({
  host: '89.116.21.79',
  user: 'root',
  password: 'Nilaash@2020',
  database: 'asianpaints_db',
  port: 3306
});

module.exports = pool.promise();