import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    if (!storedUser) {
      alert('Please log in first 😅');
      navigate('/');
    }
  }, [navigate]);

  const user = JSON.parse(storedUser || 'null');
  const role = user?.role?.toLowerCase().trim();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Logged out! 👋');
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h2 style={logoStyle}>🛒 StackKart</h2>
        <nav style={navStyle}>
          <button style={navBtnStyle} onClick={() => navigate('/shop')}>Shop</button>
          <button style={navBtnStyle} onClick={() => navigate('/cart')}>Cart</button>
          <button style={navBtnStyle} onClick={() => navigate('/dashboard')}>Profile</button>
          {role === 'admin' && (
            <button style={navBtnStyle} onClick={() => navigate('/admin')}>Admin</button>
          )}
          <button style={logoutBtnStyle} onClick={handleLogout}>Logout 🚪</button>
        </nav>
      </header>

      <section style={bannerStyle}>
        <h1 style={headingStyle}>Hey {user?.name}, welcome to StackKart™</h1>
        <p style={subTextStyle}>Your one-stop shop for everything cool ✨</p>
        <button style={shopBtnStyle} onClick={() => navigate('/shop')}>Start Shopping ⬅</button>
      </section>

      <section style={categoriesStyle}>
        <h2 style={sectionTitleStyle}>Explore Categories</h2>
        <div style={gridStyle}>
          <div style={cardStyle}>👗 Fashion</div>
          <div style={cardStyle}>💻 Electronics</div>
          <div style={cardStyle}>📚 Books</div>
          <div style={cardStyle}>🍔 Food</div>
          <div style={cardStyle}>🎮 Gaming</div>
          <div style={cardStyle}>🏠 Home Decor</div>
        </div>
      </section>
    </div>
  );
};

export default Home;

const containerStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: '#f3f3f3',
  minHeight: '100vh',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#6a1b9a',
  padding: '1rem 2rem',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 999,
};

const logoStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
};

const navBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 500,
};

const logoutBtnStyle: React.CSSProperties = {
  backgroundColor: '#ff4d4d',
  border: 'none',
  color: '#fff',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const bannerStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '4rem 2rem',
  backgroundImage: 'linear-gradient(to right, #ffe4ec, #f5d1ff)',
  borderBottom: '2px solid #ddd',
};

const headingStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#333',
  marginBottom: '0.5rem',
  textAlign: 'center',
};

const subTextStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#555',
  marginBottom: '1.5rem',
  textAlign: 'center',
};

const shopBtnStyle: React.CSSProperties = {
  padding: '0.8rem 2rem',
  fontSize: '1rem',
  backgroundColor: '#ff69b4',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 600,
};

const categoriesStyle: React.CSSProperties = {
  padding: '3rem 2rem',
  backgroundColor: '#fff',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  color: '#6a1b9a',
  marginBottom: '1.5rem',
  textAlign: 'center',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: '1rem',
  justifyItems: 'center',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#f8e8ff',
  padding: '1rem',
  borderRadius: '12px',
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#6a1b9a',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  width: '100%',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
};
