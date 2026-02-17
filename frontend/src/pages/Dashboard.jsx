import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const benutzer = JSON.parse(localStorage.getItem('benutzer'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('benutzer');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.titel}>📋 Einsatzplan Dashboard</h1>
        <div style={styles.headerRechts}>
          <span style={styles.benutzerInfo}>
            👤 {benutzer?.name} — {benutzer?.rolle}
          </span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Ausloggen
          </button>
        </div>
      </div>
      <div style={styles.inhalt}>
        <p style={styles.willkommen}>
          Willkommen zurück, {benutzer?.name}! 👋
        </p>
        <p style={styles.sub}>
          Das Dashboard wird hier aufgebaut...
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#e2e8f0',
  },
  header: {
    backgroundColor: '#16213e',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  titel: {
    fontSize: '22px',
    margin: 0,
  },
  headerRechts: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  benutzerInfo: {
    fontSize: '14px',
    color: '#94a3b8',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  inhalt: {
    padding: '40px 32px',
  },
  willkommen: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  sub: {
    color: '#94a3b8',
    fontSize: '16px',
  },
};