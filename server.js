const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// En una aplicación real, estos datos deberían venir de variables de entorno.
const dbConfig = {
    host: '127.0.0.1', // o la IP de tu servidor de base de datos
    user: 'root',      // tu usuario de MySQL
    password: '',      // tu contraseña de MySQL
    database: 'clinical_history'
};

const pool = mysql.createPool(dbConfig);

// --- API ENDPOINTS ---

// Login
app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE name = ? AND passwordHash = ?', [name, password]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Obtener pacientes de un doctor
app.get('/doctors/:doctorId/patients', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM patients WHERE doctorId = ?', [doctorId]);
        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo pacientes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Obtener consultas de un paciente
app.get('/patients/:patientId/consultations', async (req, res) => {
    const { patientId } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM consultations WHERE patientId = ? ORDER BY date DESC', [patientId]);
        res.json(rows);
    } catch (error) {
        console.error('Error obteniendo consultas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Añadir una nueva consulta
app.post('/consultations', async (req, res) => {
    const { patientId, date, motivo_consulta, desarrollo_consulta, data } = req.body;
    const newId = `c${crypto.randomBytes(4).toString('hex')}`;

    try {
        const newConsultation = {
            id: newId,
            patientId,
            date,
            motivo_consulta,
            desarrollo_consulta,
            data: JSON.stringify(data) // Convertimos el objeto data a un string JSON para guardarlo
        };

        await pool.query('INSERT INTO consultations SET ?', newConsultation);

        // Devolvemos el objeto con 'data' como objeto, no como string
        res.status(201).json({ ...newConsultation, data });

    } catch (error) {
        console.error('Error añadiendo consulta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


// Añadir un nuevo paciente (Endpoint de ejemplo, no usado en el flujo actual)
app.post('/patients', async (req, res) => {
    const { doctorId, demographics, history } = req.body;
    const newId = `p${crypto.randomBytes(4).toString('hex')}`;
    
    try {
        const newPatient = {
            id: newId,
            doctorId,
            demographics: JSON.stringify(demographics),
            history: JSON.stringify(history)
        };
        await pool.query('INSERT INTO patients SET ?', newPatient);
        res.status(201).json({ ...newPatient, demographics, history });
    } catch (error) {
        console.error('Error añadiendo paciente:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
