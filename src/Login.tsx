import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './utils/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid'; // generate unique IDs

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem('device_id');
    if (!id) {
      id = uuidv4(); // new device, generate unique ID
      localStorage.setItem('device_id', id);
    }
    setDeviceId(id);
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warn('Please fill in both fields 😅');
      return;
    }

    const { data: userData, error } = await supabase
      .from('login-page')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !userData) {
      toast.error('User not found 😥');
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      toast.error('Wrong password ❌');
      return;
    }

    if (!userData.approved) {
      toast.info("You're not approved yet. Please wait for admin approval ⏳");
      return;
    }

    if (!deviceId) {
      toast.error('Device ID not found. Something went wrong 🧨');
      return;
    }

    if (!userData.device_id) {
      // first time logging in — lock to current device
      const { error: updateError } = await supabase
        .from('login-page')
        .update({ device_id: deviceId })
        .eq('username', username);

      if (updateError) {
        toast.error('Error setting device ID 😬');
        return;
      }
    } else if (userData.device_id !== deviceId) {
      // device mismatch
      toast.error('🚫 Access denied. This account is locked to another device.');
      return;
    }

    const now = new Date();
    const role = (userData.role || '').replace(/['"]/g, '').trim().toLowerCase();

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        id: userData.id,
        username: userData.username,
        name: userData.name,
        role,
        loginTime: now.toISOString(),
      })
    );

    await supabase
      .from('login-page')
      .update({ last_login: now.toISOString() })
      .eq('username', username);

    navigate('/home', {
      state: { toastMessage: `Welcome back, ${userData.name} 😎` },
    });
  };

  // your existing styling...
  const styles = {
    page: {
      backgroundImage: 'url("/login-bg.jpg")',
      backgroundColor: '#111',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    } as React.CSSProperties,

    card: {
      backgroundColor: 'rgba(25, 25, 25, 0.7)',
      backdropFilter: 'blur(14px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
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
      color: 'white',
    } as React.CSSProperties,

    input: {
      width: '100%',
      padding: '0.7rem',
      marginBottom: '1rem',
      borderRadius: '10px',
      border: '1px solid #ccc',
      backgroundColor: '#222',
      color: 'white',
      fontSize: '1rem',
    } as React.CSSProperties,

    button: {
      width: '100%',
      padding: '0.9rem',
      backgroundColor: '#6a1b9a',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '1rem',
    } as React.CSSProperties,

    linkText: {
      textAlign: 'center',
      marginTop: '1rem',
      color: '#ccc',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
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

        <p style={styles.linkText}>
          <a href="/forgot-password" style={{ color: '#6a1b9a' }}>
            Forgot Password?
          </a>
        </p>

        <p style={styles.linkText}>
          Don’t have an account?{' '}
          <a href="/register" style={{ color: '#007BFF' }}>
            Sign up
          </a>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
