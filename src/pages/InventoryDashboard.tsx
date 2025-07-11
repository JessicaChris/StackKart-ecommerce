import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

type Product = {
  id: number;
  name: string;
  stock: number;
};

const COLORS = ['#6a1b9a', '#ff69b4', '#00C49F', '#FFBB28', '#FF4444', '#8884d8'];

const InventoryAnalytics: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, stock');

    if (error) console.error('Error fetching inventory:', error);
    else setProducts(data || []);
  };

  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  const mostStocked = [...products].sort((a, b) => b.stock - a.stock)[0];
  const leastStocked = [...products].sort((a, b) => a.stock - b.stock)[0];

  const pieData = products.map((p) => ({
    name: p.name,
    value: p.stock,
  }));

  return (
    <div style={containerStyle}>
      <h1 style={title}>📦 Inventory Analytics</h1>

      <div style={summaryBox}>
        <p><strong>Total Products:</strong> {totalProducts}</p>
        <p><strong>Low Stock Items (under 5):</strong> {lowStockCount}</p>
        <p><strong>Most Stocked:</strong> {mostStocked?.name} ({mostStocked?.stock})</p>
        <p><strong>Least Stocked:</strong> {leastStocked?.name} ({leastStocked?.stock})</p>
      </div>

      <div style={chartsWrapper}>
        {/* Bar Chart */}
        <div style={chartBox}>
          <h3>📊 Stock Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={products}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#6a1b9a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={chartBox}>
          <h3>🍰 Stock Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InventoryAnalytics;

// ✨ STYLES
const containerStyle: React.CSSProperties = {
  padding: '2rem',
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: '#fdfbff',
  minHeight: '100vh',
};

const title: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '2rem',
  color: '#6a1b9a',
  marginBottom: '1.5rem',
};

const summaryBox: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '1rem 2rem',
  borderRadius: '12px',
  marginBottom: '2rem',
  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
};

const chartsWrapper: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  justifyContent: 'center',
};

const chartBox: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '1.5rem',
  borderRadius: '12px',
  width: '500px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
};
