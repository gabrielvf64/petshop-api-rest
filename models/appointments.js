const moment = require('moment');

const connection = require('../infra/connection');

class Appointments {
  add(appointment, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');

    const data = moment(appointment.data, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:MM:SS'
    );

    const validDate = moment(data).isSameOrAfter(dataCriacao);

    const validClientName = appointment.client.length >= 5;

    const validations = [
      {
        name: 'data',
        isValid: validDate,
        message: 'The date must be equals or greater than the current date'
      },
      {
        name: 'client',
        isValid: validClientName,
        message: 'The client must have the minimum of 5 characteres'
      }
    ];

    const errors = validations.filter(field => !field.isValid);

    const hasErrors = errors.length;

    if (hasErrors) {
      res.status(400).json(errors);
    } else {
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
}

module.exports = new Appointments();
