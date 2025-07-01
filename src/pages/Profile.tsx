// src/pages/Profile.tsx
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
        <button onClick={() => navigate('/')} style={{
          marginTop: '1rem',
          padding: '0.6rem 1.2rem',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: '#333',
          color: '#fff',
          cursor: 'pointer'
        }}>
          🔙 Back to Login
        </button>
      </div>
    );
  }

  return (
    <SessionCheck>
      <div style={{
        background: 'linear-gradient(135deg, #ffe4ec, #ffcce0)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '400px',
        }}>
          <h2 style={{ color: '#ff69b4', marginBottom: '1rem' }}>👤 User Profile</h2>
          <p><strong>Name:</strong> {loggedInUser.name}</p>
          <p><strong>Username:</strong> {loggedInUser.username}</p>
          <p><strong>Role:</strong> {loggedInUser.role}</p>
          <p><strong>Login Time:</strong> {new Date(loggedInUser.loginTime).toLocaleString()}</p>

          <button onClick={() => navigate('/home')} style={{
            marginTop: '1.5rem',
            padding: '0.8rem 2rem',
            borderRadius: '10px',
            backgroundColor: '#ff69b4',
            color: 'white',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    </SessionCheck>
  );
};

export default Profile;
