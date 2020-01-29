const appointments = require('../models/appointments');

module.exports = app => {
  app.get('/appointments', (req, res) => {
    appointments.list(res);
  });

  app.get('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);

    appointments.findById(id, res);
  });

  app.post('/appointments', (req, res) => {
    const newAppointment = req.body;

    appointments.add(newAppointment, res);
  });
};
