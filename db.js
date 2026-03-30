c// Importamos la librería mysql2 que vimos en tu package.json
const mysql = require('mysql2');

// Usamos dotenv para cargar las credenciales desde un archivo .env
// Esto es VITAL para que funcione en local y en la nube sin cambiar código.
require('dotenv').config();

// Creamos un "pool" de conexiones, que es más eficiente que una conexión única.
const pool = mysql.createPool({
  // Las credenciales se leen de las variables de entorno
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // Asegúrate de que este nombre coincida con tu base de datos real (phpMyAdmin)
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT || 3306, // Puerto por defecto 3306
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convertimos las consultas a promesas para poder usar async/await
const promisePool = pool.promise();

// Exportamos el pool para usarlo en otros archivos
module.exports = promisePool;