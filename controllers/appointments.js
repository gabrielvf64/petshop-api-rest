module.exports = app => {
  app.get('/appointments', (req, res) =>
    res.send('Appointments route ok. update test')
  );

  app.post('/appointments', (req, res) => {
    console.log(req.body);
    res.send('post test');
  });
};
