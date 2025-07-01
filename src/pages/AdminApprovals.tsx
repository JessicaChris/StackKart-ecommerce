import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminApprovals: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const { data, error } = await supabase
        .from('login-page')
        .select('*')
        .eq('approved', false); // Only show unapproved users

      if (error) {
        console.error('Error fetching pending users:', error.message);
      } else {
        setPendingUsers(data || []);
      }

      setLoading(false);
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (id: string) => {
    const { error } = await supabase
      .from('login-page')
      .update({ approved: true })
      .eq('id', id);

    if (error) {
      alert('Error approving user ❌');
    } else {
      alert('User approved ✅');
      setPendingUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const deleteUser = async (id: string) => {
    const { error } = await supabase.from('login-page').delete().eq('id', id);

    if (error) {
      alert('Error deleting user ❌');
    } else {
      alert('User deleted 🗑️');
      setPendingUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Poppins' }}>
      <h1 style={{ color: '#ff69b4', textAlign: 'center' }}>📝 Pending Approvals</h1>
      {loading ? (
        <p>Loading pending users... ⏳</p>
      ) : pendingUsers.length === 0 ? (
        <p>No pending users 🎉</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pendingUsers.map((user) => (
            <li
              key={user.id}
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '10px',
              }}
            >
              <strong>{user.name}</strong> – {user.email} – @{user.username}
              <br />
              <button
                onClick={() => approveUser(user.id)}
                style={{
                  marginRight: '1rem',
                  marginTop: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                ✅ Approve
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                🗑️ Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminApprovals;
