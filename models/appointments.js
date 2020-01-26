const connection = require('../infra/connection');

class Appointments {
  add(appointment) {
    const sql = 'INSERT INTO appointments SET ?';

    connection.query(sql, appointment, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
      }
    });
  }
}

module.exports = new Appointments();
