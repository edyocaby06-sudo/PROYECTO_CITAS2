// Importamos las librerías necesarias
const express = require('express');
const cors = require('cors'); // Para permitir peticiones desde tu HTML local
const db = require('./db'); // Importamos el pool de conexión que creamos

// Iniciamos la aplicación Express
const app = express();

// Configuramos middlewares
app.use(cors()); // Permite CORS
app.use(express.json()); // Permite al servidor entender JSON en el cuerpo de la petición

// --- RUTAS (Endpoints) ---

// Ruta de ejemplo: Guardar un nuevo cliente
// Tu formulario HTML enviará datos a esta ruta usando POST a http://localhost:3000/api/clientes
app.post('/api/clientes', async (req, res) => {
  try {
    // Obtenemos los datos del cuerpo de la petición
    const { nombre_completo, telefono, correo, password } = req.body;

    // Validación simple
    if (!nombre_completo || !telefono || !correo || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Consulta SQL para insertar el registro
    // Asegúrate de que los nombres de las columnas coincidan con tu tabla real
    const query = 'INSERT INTO usuarios (nombre_completo, telefono, correo, password) VALUES (?, ?, ?, ?)';
    const values = [nombre_completo, telefono, correo, password];

    // Ejecutamos la consulta usando el pool
    const [result] = await db.execute(query, values);

    // Respondemos con éxito
    res.status(201).json({ 
      message: 'Cliente registrado correctamente', 
      id: result.insertId 
    });

  } catch (error) {
    // Si hay un error (ej. de conexión a la base de datos)
    console.error('Error al guardar cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta de ejemplo: Obtener todos los clientes (para pruebas)
app.get('/api/clientes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// --- INICIAR EL SERVIDOR ---

// Usamos el puerto configurado en .env o el 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto $",{PORT});
  console.log('Presiona Ctrl+C para detener');
});