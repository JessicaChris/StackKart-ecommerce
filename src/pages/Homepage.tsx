// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      alert('Please log in first 😅');
      navigate('/');
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  console.log("🤖 User object:", user);
console.log("🔐 Cleaned role:", user?.role?.toLowerCase().trim());


  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out! 👋');
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/download (5).jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          maxWidth: '450px',
          width: '90%',
        }}
      >
        <h1 style={{ color: '#ff69b4', fontSize: '2rem', marginBottom: '1rem' }}>
          🎀 Welcome Home, {user?.name}!
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          You’re logged in as <strong>{user?.role}</strong> — time to SLAY 🔥✨
        </p>

        <button
          onClick={goToDashboard}
          style={{
            padding: '0.9rem 2rem',
            backgroundColor: '#ff69b4',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1rem',
          }}
        >
          ➡ Go to Dashboard
        </button>

        {/* 🌟 Admin Approvals Button */}
        {user?.role?.toLowerCase().trim() === 'admin' && (
  <button
    onClick={() => navigate('/admin')}
    style={{
      padding: '0.9rem 2rem',
      backgroundColor: '#6a1b9a',
      color: '#fff',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease-in-out',
      marginBottom: '1rem',
    }}
    onMouseEnter={(e) => {
      const target = e.target as HTMLButtonElement;
      target.style.backgroundColor = '#8e24aa';
      target.style.transform = 'scale(1.05)';
    }}
    onMouseLeave={(e) => {
      const target = e.target as HTMLButtonElement;
      target.style.backgroundColor = '#6a1b9a';
      target.style.transform = 'scale(1)';
    }}
  >
    🛡️ Admin Approvals
  </button>
)}

        <br />

        <button
          onClick={handleLogout}
          style={{
            padding: '0.8rem 2rem',
            backgroundColor: '#333',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
