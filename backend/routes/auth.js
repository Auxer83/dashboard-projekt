const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './backend/.env' });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Registrierung
router.post('/register', async (req, res) => {
  const { name, email, passwort, rolle, abteilung_id } = req.body;

  try {
    const hashedPasswort = await bcrypt.hash(passwort, 10);

    db.query(
      'INSERT INTO benutzer (name, email, passwort, rolle, abteilung_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPasswort, rolle, abteilung_id],
      (err, result) => {
        if (err) {
          return res.status(400).json({ fehler: 'Email bereits vergeben' });
        }
        res.json({ nachricht: 'Benutzer erfolgreich erstellt! ✅' });
      }
    );
  } catch (err) {
    res.status(500).json({ fehler: 'Serverfehler' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, passwort } = req.body;

  db.query(
    'SELECT * FROM benutzer WHERE email = ?',
    [email],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ fehler: 'Benutzer nicht gefunden' });
      }

      const benutzer = results[0];
      const passwortKorrekt = await bcrypt.compare(passwort, benutzer.passwort);

      if (!passwortKorrekt) {
        return res.status(401).json({ fehler: 'Falsches Passwort' });
      }

      const token = jwt.sign(
        { id: benutzer.id, rolle: benutzer.rolle },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({
        nachricht: 'Login erfolgreich! ✅',
        token,
        benutzer: {
          id: benutzer.id,
          name: benutzer.name,
          email: benutzer.email,
          rolle: benutzer.rolle
        }
      });
    }
  );
});

module.exports = router;