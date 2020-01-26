const customExpress = require('./config/customExpress');
const connection = require('./infra/connection');
const Tabelas = require('./infra/tables');

connection.connect(error => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected to the database');

    Tabelas.init(connection);

    const app = customExpress();

    app.listen(3000, () => console.log('Server is up'));
  }
});
