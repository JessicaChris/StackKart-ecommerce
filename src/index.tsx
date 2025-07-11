import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inventory from './pages/Inventory';
import App from './App';
import Homepage from './pages/Homepage';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AdminApprovals from './pages/AdminApprovals';
import CategoryPage from './pages/CategoryPage';
import AdminDashboard from './pages/adminDashboard'; // ✅ make sure the name matches the file
import InventoryDashboard from './pages/InventoryDashboard';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Checkout from './pages/Checkout';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import SessionCheck from './SessionCheck';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 👇 Redirect base URL to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Shop and Cart */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/analyticsdashboard" element={<AnalyticsDashboard />} />
        <Route path="/inventorydashboard" element={<SessionCheck><InventoryDashboard /></SessionCheck>} />
        <Route path="/checkout" element={<Checkout />} />


        {/* Main Home */}
        <Route path="/home" element={<Homepage />} />

        {/* Protected routes (wrapped with SessionCheck) */}
        <Route
          path="/dashboard"
          element={
            <SessionCheck>
              <Dashboard />
            </SessionCheck>
          }
        />
        <Route
          path="/profile"
          element={
            <SessionCheck>
              <Profile />
            </SessionCheck>
          }
        />
        <Route
          path="/admin-approvals"
          element={
            <SessionCheck>
              <AdminApprovals />
            </SessionCheck>
          }
        />
        <Route
          path="/admin" // ✅ fixed route path
          element={
            <SessionCheck>
              <AdminDashboard />
            </SessionCheck>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
