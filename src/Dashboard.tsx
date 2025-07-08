import React, { useEffect, useState } from 'react';
import SessionCheck from './SessionCheck';
import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      toast.success(`Welcome back, ${userData.name} 👋`);
    }
  }, []);

  if (!user) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading... ⏳</p>;

  return (
    <SessionCheck>
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h2 style={heading}>👤 Hello, {user.name}</h2>
          <p style={subheading}>Welcome to your StackKart™ profile dashboard</p>

          <div style={infoBlock}>
            <div style={row}><strong>Name:</strong> <span>{user.name}</span></div>
            <div style={row}><strong>Username:</strong> <span>@{user.username}</span></div>
            <div style={row}><strong>Email:</strong> <span>{user.email}</span></div>
            <div style={row}><strong>Role:</strong> <span>{user.role}</span></div>
            <div style={row}><strong>Last Login:</strong> <span>{new Date(user.loginTime).toLocaleString()}</span></div>
          </div>

          <div style={buttonWrap}>
            <button style={buttonStyle} onClick={() => toast.info('Feature coming soon')}>✏️ Edit Profile</button>
            <button
              style={{ ...buttonStyle, backgroundColor: '#333' }}
              onClick={() => {
                localStorage.removeItem('loggedInUser');
                toast.info('Logged out!');
                window.location.href = '/';
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </SessionCheck>
  );
};

export default Dashboard;

// 🔧 Styles

const pageStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  fontFamily: 'Poppins, sans-serif',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '2rem',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '450px',
};

const heading: React.CSSProperties = {
  fontSize: '1.8rem',
  color: '#6a1b9a',
  marginBottom: '0.3rem',
};

const subheading: React.CSSProperties = {
  color: '#777',
  fontSize: '1rem',
  marginBottom: '1.5rem',
};

const infoBlock: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const row: React.CSSProperties = {
  marginBottom: '1rem',
  fontSize: '1rem',
  color: '#333',
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonWrap: React.CSSProperties = {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: '#6a1b9a',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
};
