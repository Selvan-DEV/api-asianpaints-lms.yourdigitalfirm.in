const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'asian_paints'
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
  user: 'admin',
  password: '@Gt5k(HvcAs+KXCiX&JI',
  database: 'app_db',
  port: 3306
});

module.exports = pool.promise();