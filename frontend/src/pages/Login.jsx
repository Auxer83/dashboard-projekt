import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [passwort, setPasswort] = useState('');
  const [fehler, setFehler] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, passwort });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('benutzer', JSON.stringify(res.data.benutzer));
      navigate('/dashboard');
    } catch (err) {
      setFehler('Email oder Passwort falsch');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.titel}>Dashboard Login</h1>
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Passwort"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
          />
          {fehler && <p style={styles.fehler}>{fehler}</p>}
          <button style={styles.button} type="submit">
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a1a2e',
  },
  box: {
    backgroundColor: '#16213e',
    padding: '40px',
    borderRadius: '12px',
    width: '360px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  },
  titel: {
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1px solid #0f3460',
    backgroundColor: '#0f3460',
    color: '#e2e8f0',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  fehler: {
    color: '#e94560',
    textAlign: 'center',
    marginBottom: '10px',
  },
};