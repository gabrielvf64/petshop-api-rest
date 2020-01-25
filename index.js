const express = require('express');

const app = express();

app.listen(3000, () => console.log('server up'));

app.get('/appointments', (req, res) => res.send('Appointments route ok'));
