/* eslint-disable import/first */
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // ✅ top-level import only

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnapprovedUsers();
  }, []);

  const fetchUnapprovedUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('login-page')
      .select('*')
      .eq('approved', false);

    if (error) {
      console.error('Error fetching users:', error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const approveUser = async (userId: number) => {
    const { error } = await supabase
      .from('login-page')
      .update({ approved: true })
      .eq('id', userId);

    if (error) {
      alert('Error approving user ❌');
      console.error(error.message);
    } else {
      alert('User approved ✅');
      fetchUnapprovedUsers(); // Refresh list
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#ff69b4', marginBottom: '2rem' }}>
        🛡️ Admin Panel – Pending Approvals
      </h1>

      {loading ? (
        <p>Loading... ⏳</p>
      ) : users.length === 0 ? (
        <p>No pending users 💤</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> @{user.username}</p>
              <button
                onClick={() => approveUser(user.id)}
                style={{
                  padding: '0.5rem 1.2rem',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                ✅ Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
