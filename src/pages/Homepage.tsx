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
  const role = user?.role?.toLowerCase().trim();

  const goToDashboard = () => navigate('/dashboard');
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out! 👋');
    navigate('/');
  };

  const buttonBase: React.CSSProperties = {
    padding: '0.9rem 2rem',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
    transition: 'all 0.3s ease-in-out',
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
          You’re logged in as <strong>{role}</strong> 
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Dashboard Button */}
          <button
            onClick={goToDashboard}
            style={{
              ...buttonBase,
              backgroundColor: '#ff69b4',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff85c1')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff69b4')}
          >
            ➡ Go to Dashboard
          </button>

          {/* Admin-Only Buttons */}
          {role === 'admin' && (
            <>
              <button
                onClick={() => navigate('/admin')}
                style={{
                  ...buttonBase,
                  backgroundColor: '#6a1b9a',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8e24aa')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6a1b9a')}
              >
                🛡️ Admin Approvals
              </button>

              <button
                onClick={() => navigate('/analytics')}
                style={{
                  ...buttonBase,
                  backgroundColor: '#008080',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00b3b3')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#008080')}
              >
                📈 Analytics Dashboard
              </button>
            </>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              ...buttonBase,
              backgroundColor: '#333',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#555')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#333')}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
