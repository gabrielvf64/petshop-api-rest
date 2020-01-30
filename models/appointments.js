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
          res.status(201).json(appointment);
        }
      });
    }
  }

  list(res) {
    const sql = 'SELECT * FROM appointments';

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  findById(id, res) {
    const sql = `SELECT * FROM appointments where id=${id}`;

    connection.query(sql, (error, results) => {
      const appointmentObject = results[0];

      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(appointmentObject);
      }
    });
  }

  update(id, values, res) {
    if (values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format(
        'YYYY-MM-DD HH:MM:SS'
      );
    }

    const sql = 'UPDATE appointments SET ? WHERE id=?';

    connection.query(sql, [values, id], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ ...values, id });
      }
    });
  }

  delete(id, res) {
    const sql = 'DELETE FROM appointments where id=?';

    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Appointments();
