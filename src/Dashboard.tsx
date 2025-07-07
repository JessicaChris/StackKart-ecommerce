import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import SessionCheck from './SessionCheck';
import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [form, setForm] = useState({ name: '', username: '', email: '' });
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAdmin(user.role === 'admin');
      toast.success('Login successful ✅');
    }
  }, []);

  useEffect(() => {
    if (currentUser) fetchUsers();
  }, [currentUser]);

  const fetchUsers = async () => {
    setLoading(true);

    if (!currentUser) return;

    let query = supabase.from('login-page').select('id, name, username, email');

    if (isAdmin) {
      query = query.eq('approved', true);
    } else {
      query = query.eq('id', currentUser.id);
    }

    const { data, error } = await query;

    if (error) {
      toast.error('Error fetching data ❌');
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    const { error } = await supabase.from('login-page').delete().eq('id', id);
    if (error) {
      toast.error('Delete failed ❌');
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
      .update({ name: form.name, username: form.username, email: form.email })
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
      <div style={{ padding: '2rem', fontFamily: 'Poppins, sans-serif', minHeight: '100vh', background: '#f3f3f3' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#6a1b9a' }}>
          {isAdmin ? '👥 Approved Users' : '👤 Your Profile'}
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
                {isAdmin && (
                  <>
                    <th>Edit</th>
                    <th>Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>@{user.username}</td>
                  <td>{user.email}</td>
                  {isAdmin && (
                    <>
                      <td>
                        <button style={editButtonStyle} onClick={() => openEditModal(user)}>✏️</button>
                      </td>
                      <td>
                        <button style={deleteButtonStyle} onClick={() => handleDelete(user.id)}>❌</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editUser && (
          <div style={modalOverlay}>
            <div style={modalStyle}>
              <h2>Edit User</h2>
              <label>Name:</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <label>Username:</label>
              <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <label>Email:</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={handleEditSubmit} style={editButtonStyle}>✅ Update</button>
                <button onClick={() => setEditUser(null)} style={deleteButtonStyle}>❌ Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SessionCheck>
  );
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  marginTop: '2rem',
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
  borderRadius: '12px',
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
};

export default Dashboard;
