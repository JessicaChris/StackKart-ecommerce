import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const Analytics: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    const { data, error } = await supabase
      .from('login-page')
      .select('role, last_login');

    if (error) {
      console.error('Error fetching stats:', error.message);
    } else {
      setUserData(data || []);
      setLoading(false);
    }
  };

  // 🌈 Group by Role
  const roleCounts = userData.reduce((acc, curr) => {
    const role = (curr.role || 'unknown').replace(/['"]/g, '').trim().toLowerCase();
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleChartData = Object.keys(roleCounts).map((role) => ({
    role,
    count: roleCounts[role],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF4444', '#aa00ff'];

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>📊 User Analytics Dashboard</h1>

      {loading ? (
        <p>Loading stats... ⏳</p>
      ) : (
        <div style={chartsWrapper}>
          {/* Bar Chart */}
          <div style={chartBox}>
            <h2>Users by Role 🧑‍💼</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleChartData}>
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6a1b9a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={chartBox}>
            <h2>Roles Proportion 🍰</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleChartData}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {roleChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

// ✨ Styles
const containerStyle: React.CSSProperties = {
  padding: '2rem',
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#6a1b9a',
  fontSize: '2.2rem',
  marginBottom: '2rem',
};

const chartsWrapper: React.CSSProperties = {
  display: 'flex',
  gap: '2rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const chartBox: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  width: '500px',
};

export default Analytics;
