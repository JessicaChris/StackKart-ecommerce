import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import SessionCheck from './SessionCheck';
import { toast } from 'react-toastify'; // ✅ ADD THIS

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [form, setForm] = useState({ name: '', username: '', email: '' });

  useEffect(() => {
    // ✅ Show only on first mount
    toast.success('Login Successful ✅');
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('login-page')
      .select('id, name, username, email')
      .eq('approved', true);

    if (error) {
      console.error('Error fetching users:', error.message);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    const { error } = await supabase.from('login-page').delete().eq('id', id);

    if (error) {
      console.error('Error deleting user:', error.message);
      toast.error('Failed to delete user ❌');
    } else {
      toast.success('User deleted 🗑️');
      fetchUsers();
    }
  };

  const openEditModal = (user: any) => {
    setEditUser(user);
    setForm({ name: user.name, username: user.username, email: user.email });
  };

  const handleEditSubmit = async () => {
    if (!editUser) return;

    const { error } = await supabase
      .from('login-page')
      .update({
        name: form.name,
        username: form.username,
        email: form.email,
      })
      .eq('id', editUser.id);

    if (error) {
      toast.error('Update failed ❌');
    } else {
      toast.success('User updated ✅');
      setEditUser(null);
      fetchUsers();
    }
  };

  return (
    <SessionCheck>
      <div
        style={{
          padding: '2rem',
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#f9f9f9',
          minHeight: '100vh',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: '2.2rem', marginBottom: '2rem', color: '#6a1b9a' }}>
          👥 Approved Users
        </h1>

        {loading ? (
          <p>Loading users... ⏳</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>@{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button style={editButtonStyle} onClick={() => openEditModal(user)}>
                      ✏️
                    </button>
                  </td>
                  <td>
                    <button style={deleteButtonStyle} onClick={() => handleDelete(user.id)}>
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 🛠️ Edit Modal */}
        {editUser && (
          <div style={modalOverlay}>
            <div style={modalStyle}>
              <h2>Edit User ✏️</h2>

              <label>Name:</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

              <label>Username:</label>
              <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />

              <label>Email:</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button onClick={handleEditSubmit} style={{ ...editButtonStyle, flex: 1 }}>
                  ✅ Update
                </button>
                <button onClick={() => setEditUser(null)} style={{ ...deleteButtonStyle, flex: 1 }}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SessionCheck>
  );
};

// 🎨 Styles
const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
};

const editButtonStyle: React.CSSProperties = {
  backgroundColor: '#6a1b9a',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.6rem',
  borderRadius: '6px',
  cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#e53935',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.6rem',
  borderRadius: '6px',
  cursor: 'pointer',
};

const modalOverlay: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '15px',
  minWidth: '350px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
};

export default Dashboard;
