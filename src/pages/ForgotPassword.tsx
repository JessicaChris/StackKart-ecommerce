import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { supabase } from '../supabaseClient';

const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!username || !newPassword) {
      alert("Both fields are required 😅");
      return;
    }

    const { data, error } = await supabase
      .from('login-page')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data) {
      alert("Username not found 😥");
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error: updateError } = await supabase
      .from('login-page')
      .update({ password: hashedPassword })
      .eq('username', username);

    if (updateError) {
      alert("Failed to reset password ❌");
    } else {
      alert("Password updated successfully! 🔒");
      navigate('/');
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/register-jpg.jpg")',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '2rem',
          borderRadius: '20px',
          color: '#fff',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🔑 Reset Password</h2>

        <label>Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            marginBottom: '1rem',
            borderRadius: '10px',
            border: '1px solid #fff',
            backgroundColor: 'transparent',
            color: 'white',
          }}
        />

        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            marginBottom: '1rem',
            borderRadius: '10px',
            border: '1px solid #fff',
            backgroundColor: 'transparent',
            color: 'white',
          }}
        />

        <button
          onClick={handleReset}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#00bfff',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🔁 Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
