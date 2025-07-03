import bcrypt from 'bcryptjs';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !username || !password || !confirmPassword) {
      toast.warn("Please fill in all fields 😅");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match 💀");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from('login-page').insert([
      { name, email, username, password: hashedPassword, approved: false, role: 'user' }
    ]);

    if (error) {
      console.error('Supabase error:', error.message);
      toast.error("Error registering user ❌");
    } else {
      toast.success(`Welcome, ${name}! You're registered ✅`);

      if (formRef.current) {
        formRef.current.submit(); // Send formsubmit email
      }

      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const pageStyle: React.CSSProperties = {
    backgroundImage: 'url("/download (6).jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(34, 33, 33, 0.85)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    padding: '2rem',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Poppins, sans-serif',
    color: 'white',
  };

  const headingStyle: React.CSSProperties = {
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginBottom: '1.5rem',
    color: '#ffffff',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.7rem',
    marginBottom: '1rem',
    borderRadius: '10px',
    border: '1px solid #000',
    fontSize: '1rem',
    backgroundColor: '#222',
    color: 'white',
  };

  const buttonWrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    marginTop: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.9rem',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  };

  const shineOverlayStyle: React.CSSProperties = {
    content: '""',
    position: 'absolute' as 'absolute',
    top: 0,
    left: '-75%',
    width: '50%',
    height: '100%',
    background: 'linear-gradient(120deg, rgba(255,255,255,0.4), rgba(255,255,255,0))',
    transform: 'skewX(-20deg)',
    animation: 'shine 2s infinite',
    zIndex: 2,
    pointerEvents: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    display: 'block',
    fontFamily: 'Poppins',
    color: 'white',
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Register Now</h2>

        <label style={labelStyle}>Full Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />

        <div style={buttonWrapperStyle}>
          <button onClick={handleRegister} style={buttonStyle}>
            Sign Up ✨
          </button>
          <div style={shineOverlayStyle}></div>
        </div>

        {/* 📨 Hidden formsubmit */}
        <form
          ref={formRef}
          action="https://formsubmit.co/jessica3chris@gmail.com"
          method="POST"
          style={{ display: 'none' }}
        >
          <input type="hidden" name="_subject" value="New User Registered 🎉" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="Full Name" value={name} />
          <input type="hidden" name="Email" value={email} />
          <input type="hidden" name="Username" value={username} />
        </form>
      </div>
    </div>
  );
};

export default Register;
