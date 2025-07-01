// src/SessionCheck.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SessionCheckProps {
  children: React.ReactNode;
}

const SessionCheck: React.FC<SessionCheckProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      alert('You are not logged in ❌');
      navigate('/');
      return;
    }

    const user = JSON.parse(loggedInUser);
    const loginTime = new Date(user.loginTime);
    const now = new Date();
    const diffInDays = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays > 10) {
      alert('Session expired 😴 Please log in again!');
      localStorage.removeItem('loggedInUser');
      navigate('/');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default SessionCheck;
