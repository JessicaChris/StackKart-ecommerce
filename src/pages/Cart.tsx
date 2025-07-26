import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { toast } from 'react-toastify';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const handleQuantityChange = (id: number, delta: number) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleRemove = (id: number) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { data: product, error: fetchError } = await supabase
          .from('products')
          .select('stock')
          .eq('name', item.name)
          .single();

        if (fetchError || !product) {
          console.error(`Error fetching ${item.name}:`, fetchError);
          toast.error(`Failed to process ${item.name}`);
          continue;
        }

        const newStock = product.stock - item.quantity;
        if (newStock < 0) {
          toast.warn(`Not enough stock for ${item.name}`);
          continue;
        }

        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('name', item.name);

        if (updateError) {
          console.error(`Error updating ${item.name}:`, updateError);
          toast.error(`Error updating stock for ${item.name}`);
        }
      }

      toast.success('Checkout complete! Thank you for shopping 🛍️');
      localStorage.removeItem('cart');
      setCartItems([]);
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Something went wrong during checkout');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty 😢</p>
      ) : (
        <div style={styles.cartBox}>
          {cartItems.map(item => (
            <div key={item.id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>₹{item.price} x {item.quantity}</p>
                <div style={styles.controls}>
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span style={{ margin: '0 1rem' }}>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.id)} style={styles.removeBtn}>❌ Remove</button>
              </div>
            </div>
          ))}
          <h2 style={styles.total}>Total: ₹{total}</h2>
          <button style={styles.checkout} onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
      <button onClick={() => navigate('/shop')} style={styles.backBtn}>🛍️ Back to Shop</button>
    </div>
  );
};

export default Cart;

// 🔥 styles
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: '2rem',
    fontFamily: 'Poppins',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#6a1b9a',
    marginBottom: '2rem',
  },
  empty: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  cartBox: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  item: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  removeBtn: {
    marginTop: '0.5rem',
    backgroundColor: '#e53935',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  total: {
    textAlign: 'right',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  checkout: {
    width: '100%',
    backgroundColor: '#6a1b9a',
    color: '#fff',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    marginTop: '1rem',
    cursor: 'pointer',
  },
  backBtn: {
    display: 'block',
    margin: '2rem auto 0',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
