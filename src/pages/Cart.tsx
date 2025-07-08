// src/pages/Cart.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const Cart: React.FC = () => {
  const navigate = useNavigate();

  // Sample cart data (later this should come from context or global state like Redux or Zustand)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'StackKart Hoodie 🧥', price: 999, quantity: 1 },
    { id: 2, name: 'TypeScript Notebook 📓', price: 299, quantity: 2 },
  ]);

  const handleQuantityChange = (id: number, delta: number) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
  };

  const handleRemove = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p style={styles.emptyText}>Your cart is empty 😢</p>
      ) : (
        <div style={styles.cartBox}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.itemCard}>
              <h3>{item.name}</h3>
              <p>₹{item.price} x {item.quantity}</p>
              <div style={styles.qtyControls}>
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span style={{ margin: '0 1rem' }}>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <button style={styles.removeBtn} onClick={() => handleRemove(item.id)}>❌ Remove</button>
            </div>
          ))}

          <h2 style={styles.total}>Total: ₹{totalPrice}</h2>

          <button style={styles.checkoutBtn} onClick={() => alert('Checkout soon 😌💳')}>
            Proceed to Checkout
          </button>
        </div>
      )}

      <button onClick={() => navigate('/home')} style={styles.homeBtn}>🏠 Back to Homepage</button>
    </div>
  );
};

export default Cart;

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: '2rem',
    fontFamily: 'Poppins',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#6a1b9a',
    marginBottom: '2rem',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: '1.2rem',
  },
  cartBox: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  },
  itemCard: {
    marginBottom: '1.5rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  removeBtn: {
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  total: {
    textAlign: 'right',
    marginTop: '2rem',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  checkoutBtn: {
    marginTop: '1rem',
    width: '100%',
    padding: '1rem',
    borderRadius: '10px',
    backgroundColor: '#6a1b9a',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
  },
  homeBtn: {
    display: 'block',
    margin: '2rem auto 0',
    padding: '0.6rem 1.4rem',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
  },
};
