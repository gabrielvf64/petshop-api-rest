const moment = require('moment');

const connection = require('../infra/connection');

class Appointments {
  add(appointment, res) {
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
        res.status(400).json(error);
      } else {
        res.status(201).json(results);
      }
    });
  }
}

module.exports = new Appointments();
