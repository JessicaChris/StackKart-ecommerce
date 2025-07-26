// src/pages/Inventory.tsx

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
};

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStock, setNewStock] = useState('');

  // 🔄 Fetch products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching:', error);
      toast.error('Failed to fetch products');
    } else {
      setProducts(data as Product[]);
    }
  };

  // ➕ Add product
  const addProduct = async () => {
    if (!name || !price || !stock) return alert('Fill all fields!');

    const { error } = await supabase.from('products').insert([
      {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
      },
    ]);

    if (error) {
      console.error('Insert error:', error);
      toast.error('Failed to add product');
    } else {
      toast.success('Product added!');
      setName('');
      setPrice('');
      setStock('');
      fetchProducts();
    }
  };

  // 🗑️ Delete product
  const deleteProduct = async (id: number) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Delete error:', error);
      toast.error('Delete failed');
    } else {
      toast.success('Product deleted');
      fetchProducts();
    }
  };

  // 📝 Update stock
  const updateStock = async (id: number) => {
    const parsedStock = parseInt(newStock);
    if (isNaN(parsedStock)) {
      alert('Enter a valid number');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .update({ stock: parsedStock })
      .eq('id', id);

    console.log('Update response:', { data, error });

    if (error) {
      console.error('Update error:', error);
      toast.error('Update failed');
    } else {
      toast.success('Stock updated!');
      setEditingId(null);
      setNewStock('');
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={container}>
      <ToastContainer position="top-right" theme="colored" />
      <h2 style={title}>📦 StackKart Inventory</h2>

      {/* Add product */}
      <div style={form}>
        <input style={input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={input} placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input style={input} placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <button style={button} onClick={addProduct}>➕ Add Product</button>
      </div>

      {/* Table */}
      <table style={table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>₹{prod.price}</td>
              <td style={{ color: prod.stock < 5 ? 'red' : '#333' }}>
                {editingId === prod.id ? (
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    style={editInput}
                  />
                ) : (
                  prod.stock
                )}
              </td>
              <td>
                {editingId === prod.id ? (
                  <>
                    <button style={saveBtn} onClick={() => updateStock(prod.id)}>✅ Save</button>
                    <button style={cancelBtn} onClick={() => setEditingId(null)}>❌ Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      style={editBtn}
                      onClick={() => {
                        setEditingId(prod.id);
                        setNewStock(prod.stock.toString());
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button style={deleteBtn} onClick={() => deleteProduct(prod.id)}>🗑️ Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;

// 💅🏻 Styles

const container: React.CSSProperties = {
  padding: '2rem',
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: '#fdfbff',
  minHeight: '100vh',
};

const title: React.CSSProperties = {
  fontSize: '1.8rem',
  color: '#6a1b9a',
  marginBottom: '1rem',
};

const form: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '2rem',
  flexWrap: 'wrap',
};

const input: React.CSSProperties = {
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  minWidth: '150px',
};

const editInput: React.CSSProperties = {
  padding: '4px',
  fontSize: '0.9rem',
  borderRadius: '4px',
  border: '1px solid #999',
  width: '80px',
};

const button: React.CSSProperties = {
  backgroundColor: '#6a1b9a',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const table: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
};

const editBtn: React.CSSProperties = {
  backgroundColor: '#f0ad4e',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '5px 10px',
  marginRight: '6px',
  cursor: 'pointer',
};

const saveBtn: React.CSSProperties = {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '5px 10px',
  marginRight: '6px',
  cursor: 'pointer',
};

const cancelBtn: React.CSSProperties = {
  backgroundColor: '#999',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '5px 10px',
  marginRight: '6px',
  cursor: 'pointer',
};

const deleteBtn: React.CSSProperties = {
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '5px 10px',
  cursor: 'pointer',
};
