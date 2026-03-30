const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// ESTA LÍNEA ES LA MAGIA: Permite ver la web (frontend)
app.use(express.static(__dirname));

// Configuración de la conexión a MySQL (DINÁMICA PARA LA NUBE)
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // Tu clave de MySQL local
    database: process.env.DB_NAME || 'proyecto_citas2',
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado exitosamente a la base de datos');
});

// Ruta de ejemplo para probar el registro
app.post('/registrar', (req, res) => {
    const { nombre, telefono, servicio } = req.body;
    const query = 'INSERT INTO clientas (nombre, telefono, servicio) VALUES (?, ?, ?)';
    db.query(query, [nombre, telefono, servicio], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Registro exitoso');
    });
});

// ESTO ES LO QUE NECESITA RENDER: Puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor activo en el puerto $",{PORT});
});