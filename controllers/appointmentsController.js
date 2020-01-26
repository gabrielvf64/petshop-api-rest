const Appointments = require('../models/appointments');

module.exports = app => {
  app.get('/appointments', (req, res) =>
    res.send('Appointments route ok. update test')
  );

  app.post('/appointments', (req, res) => {
    const newAppointment = req.body;

    Appointments.add(newAppointment);
    res.send('post test');
  });
};
