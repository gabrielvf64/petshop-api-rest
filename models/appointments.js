const moment = require('moment');

const connection = require('../infra/connection');

class Appointments {
  add(appointment) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');

    const data = moment(appointment.data, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:MM:SS'
    );

    const atendimentoDatado = {
      ...appointment,
      dataCriacao,
      data
    };

    const sql = 'INSERT INTO appointments SET ?';

    connection.query(sql, atendimentoDatado, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
      }
    });
  }
}

module.exports = new Appointments();
