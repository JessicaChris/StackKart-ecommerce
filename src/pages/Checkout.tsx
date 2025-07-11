// src/pages/Checkout.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateProductStockAfterPurchase = async () => {
    for (const item of cartItems) {
      const { data, error } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single();

      if (error || !data) {
        console.error(`Failed to fetch stock for ${item.name}`, error?.message);
        toast.error(`Failed to fetch stock for ${item.name}`);
        continue;
      }

      const currentStock = data.stock;
      const newStock = currentStock - item.quantity;

      if (newStock < 0) {
        toast.warning(`Only ${currentStock} left of ${item.name}`);
        continue;
      }

      const { error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', item.id);

      if (updateError) {
        console.error(`Failed to update stock for ${item.name}`, updateError.message);
        toast.error(`Couldn't update stock for ${item.name}`);
      } else {
        console.log(`Stock updated for ${item.name}`);
      }
    }
  };

  const handleFakePayment = async () => {
    if (cartItems.length === 0) {
      toast.info('Your cart is empty 😢');
      return;
    }

    await updateProductStockAfterPurchase();
    toast.success('✅ Order placed! Stock updated.');
    localStorage.removeItem('cart');
    setCartItems([]);
    setTimeout(() => navigate('/shop'), 2000); // Redirect after 2 secs
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" theme="colored" />
      <h1 style={styles.heading}>🧾 Checkout</h1>
      {cartItems.length === 0 ? (
        <p style={styles.empty}>No items to checkout 😭</p>
      ) : (
        <div style={styles.checkoutBox}>
          <ul style={styles.itemList}>
            {cartItems.map((item) => (
              <li key={item.id} style={styles.item}>
                {item.name} x {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h2>Total: ₹{total}</h2>
          <button onClick={handleFakePayment} style={styles.payBtn}>
            ✅ Fake Pay & Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: '2rem',
    fontFamily: 'Poppins',
    backgroundColor: '#f4f4f4',
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
  checkoutBox: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1rem',
  },
  item: {
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
  },
  payBtn: {
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
};
