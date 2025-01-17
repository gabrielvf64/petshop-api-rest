class Tables {
  init(connection) {
    this.connection = connection;

    this.createAppointments();
  }

  createAppointments() {
    const sql =
      'CREATE TABLE IF NOT EXISTS appointments (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL,  status varchar(20) NOT NULL, observations text, PRIMARY KEY(id))';
    this.connection.query(sql, error => {
      if (error) {
        console.log(error);
      } else {
        console.log('created table');
      }
    });
  }
}

module.exports = new Tables();
