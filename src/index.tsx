import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './pages/Homepage';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import AdminDashboard from './pages/adminDashboard';
import Profile from './pages/Profile';
import AdminApprovals from './pages/AdminApprovals';
import Dashboard from './Dashboard';
import SessionCheck from './SessionCheck'; 
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import ForgotPassword from './pages/ForgotPassword';
import 'react-toastify/dist/ReactToastify.css'
import './index.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <SessionCheck>
    <Routes>
      {/* all your routes here */}
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
  </SessionCheck>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/home" element={<SessionCheck><Home /></SessionCheck>} />
        <Route path="/profile" element={<SessionCheck><Profile /></SessionCheck>} />
        <Route path="/admin" element={<SessionCheck><AdminDashboard /></SessionCheck>} />
        <Route path="/shop" element={<SessionCheck><Shop /></SessionCheck>} />
         <Route path="/cart" element={<SessionCheck><Cart /></SessionCheck>} />
        <Route path="/approvals" element={<SessionCheck><AdminApprovals /></SessionCheck>} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<SessionCheck><Dashboard /></SessionCheck>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
