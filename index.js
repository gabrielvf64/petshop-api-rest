const customExpress = require('./config/customExpress');

const connection = require('./infra/connection');

connection.connect(error => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected to the database');

    const app = customExpress();

    app.listen(3000, () => console.log('Server is up'));
  }
});
