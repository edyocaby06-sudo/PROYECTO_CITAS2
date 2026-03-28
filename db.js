const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_citas'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la DB: ' + err.message);
    return;
  }
  console.log('¡Conectado a la base de datos db_citas!');
});

module.exports = connection;