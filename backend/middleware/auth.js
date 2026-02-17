const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './backend/.env' });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ fehler: 'Kein Token — Zugriff verweigert' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.benutzer = decoded;
    next();
  } catch (err) {
    res.status(403).json({ fehler: 'Token ungültig' });
  }
};

const nurAdmin = (req, res, next) => {
  if (req.benutzer.rolle !== 'admin') {
    return res.status(403).json({ fehler: 'Nur Admins haben Zugriff' });
  }
  next();
};

module.exports = { verifyToken, nurAdmin };