import React from 'react';
import SessionCheck from '../SessionCheck';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

  if (!loggedInUser.name) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Poppins' }}>
        <h2>User not found 😢</h2>
        <button
          onClick={() => navigate('/')}
          style={backButtonStyle}
        >
          🔙 Back to Login
        </button>
      </div>
    );
  }

  return (
    <SessionCheck>
      <div style={pageStyle}>
        <div style={boxStyle}>
          <h1 style={titleStyle}>Hello, {loggedInUser.name} 👋</h1>
          <p style={subtitleStyle}>Welcome to your StackKart™ profile dashboard!</p>

          <div style={infoBlock}>
            <h3 style={infoLabel}>Name:</h3>
            <p style={infoValue}>{loggedInUser.name}</p>

            <h3 style={infoLabel}>Username:</h3>
            <p style={infoValue}>@{loggedInUser.username}</p>

            <h3 style={infoLabel}>Role:</h3>
            <p style={infoValue}>{loggedInUser.role}</p>

            <h3 style={infoLabel}>Last Login:</h3>
            <p style={infoValue}>{new Date(loggedInUser.loginTime).toLocaleString()}</p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button onClick={() => navigate('/orders')} style={buttonStyle}>🧾 View Orders</button>
            <button onClick={() => navigate('/settings')} style={buttonStyle}>⚙️ Account Settings</button>
            <button onClick={() => navigate('/home')} style={homeButtonStyle}>🏠 Go to Homepage</button>
          </div>
        </div>
      </div>
    </SessionCheck>
  );
};

export default Profile;

const pageStyle: React.CSSProperties = {
  background: '#f8f8f8',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 1rem',
  fontFamily: 'Poppins, sans-serif',
};

const boxStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '16px',
  padding: '2rem',
  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
  maxWidth: '450px',
  width: '100%',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  color: '#6a1b9a',
  marginBottom: '0.5rem',
  textAlign: 'center',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#666',
  marginBottom: '2rem',
  textAlign: 'center',
};

const infoBlock: React.CSSProperties = {
  background: '#f9f9f9',
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const infoLabel: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#888',
  marginTop: '1rem',
  marginBottom: '0.3rem',
};

const infoValue: React.CSSProperties = {
  fontSize: '1.05rem',
  color: '#333',
  fontWeight: 500,
};

const buttonStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginBottom: '1rem',
  padding: '0.75rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#6a1b9a',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
};

const homeButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#333',
};

const backButtonStyle: React.CSSProperties = {
  marginTop: '1rem',
  padding: '0.6rem 1.2rem',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#333',
  color: '#fff',
  cursor: 'pointer'
};
