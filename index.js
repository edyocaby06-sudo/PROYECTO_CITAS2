const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// ESTA LÍNEA ES LA MAGIA: Permite ver la web en localhost:3000
app.use(express.static(__dirname));

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_citas' // 
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión:", err.message);
        return;
    }
    console.log("✅ ¡Conectado a la base de datos!");
});

// Ruta para recibir los datos del formulario
app.post('/registrar', (req, res) => {
    const { nombre, password } = req.body;
    
    // Datos automáticos para las columnas obligatorias de tu tabla
    const correoAuto = nombre.replace(/\s+/g, '').toLowerCase() + "@nails.com";
    const rolDefecto = 'cliente';

    const sql = "INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [nombre, correoAuto, password, rolDefecto], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ mensaje: "¡Clienta registrada con éxito!" });
    });
});

app.listen(3000, () => {
    console.log("🚀 Servidor listo en http://localhost:3000");
});