import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import bcrypt from 'bcryptjs';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please fill in both fields 😅');
      return;
    }

    const { data, error } = await supabase
      .from('login-page')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data) {
      alert('User not found 😥');
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, data.password);

    if (!isPasswordCorrect) {
      alert('Wrong password ❌');
      return;
    }

    if (!data.approved) {
      alert("You're not approved yet. Please wait for admin approval ⏳");
      return;
    }

    const now = new Date();

    // ✅ FIXED: Clean the role from weird quotes or spaces
    const role = (data.role || '').replace(/['"]/g, '').trim().toLowerCase();
    console.log("✅ Final role being saved:", role);

    // ✅ Store user info in localStorage
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        username: data.username,
        name: data.name,
        role: role,
        loginTime: now.toISOString(),
      })
    );

    // ✅ Update Supabase last login
    await supabase
      .from('login-page')
      .update({ last_login: now.toISOString() })
      .eq('username', username);

    // ✅ Just send everyone to /home
    alert(`Welcome back, ${data.name} 😎`);
    navigate('/home');
  };

  // 🎨 Styling
  const styles = {
    page: {
      backgroundImage: 'url("/download (6).jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    } as React.CSSProperties,

    card: {
      background: 'rgba(34, 33, 33, 0.85)',
      backdropFilter: 'blur(12px)',
      borderRadius: '20px',
      padding: '2rem',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      fontFamily: 'Poppins, sans-serif',
      color: 'white',
    } as React.CSSProperties,

    label: {
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      display: 'block',
      fontFamily: 'Poppins',
      color: 'white',
    } as React.CSSProperties,

    input: {
      width: '100%',
      padding: '0.7rem',
      marginBottom: '1rem',
      borderRadius: '10px',
      border: '1px solid #fff',
      backgroundColor: 'transparent',
      color: 'white',
      fontSize: '1rem',
    } as React.CSSProperties,

    button: {
      width: '100%',
      padding: '0.9rem',
      backgroundColor: '#000',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#fff',
            fontFamily: 'Poppins',
          }}
        >
          Login Page 🔐
        </h2>

        <label style={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          ✨ Login ✨
        </button>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontFamily: 'Poppins',
            color: 'white',
          }}
        >
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#007BFF' }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
