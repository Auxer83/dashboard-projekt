const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config({ path: './backend/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Datenbankverbindung
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Datenbankverbindung fehlgeschlagen:', err);
    return;
  }
  console.log('Datenbank erfolgreich verbunden! ✅');
});

// Test-Route
app.get('/', (req, res) => {
  res.json({ message: 'Server läuft erfolgreich! 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
const { verifyToken, nurAdmin } = require('./middleware/auth');

// Geschützte Test-Route
app.get('/api/geschuetzt', verifyToken, (req, res) => {
  res.json({ nachricht: `Willkommen ${req.benutzer.rolle}! Du bist eingeloggt ✅` });
});

// Nur Admin Route
app.get('/api/nur-admin', verifyToken, nurAdmin, (req, res) => {
  res.json({ nachricht: 'Willkommen Admin! 👑' });
});