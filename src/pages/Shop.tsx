import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'T-Shirt 👕',
    price: 799,
    image: '/products/shirt.jpg', // stored in public/products
  },
  {
    id: 2,
    name: 'Mug ☕',
    price: 499,
    image: '/products/mug.jpg',
  },
  {
    id: 3,
    name: 'Hoodie 🧥',
    price: 1099,
    image: '/products/hoodie.jpg',
  },
];

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      alert(`${product.name} is already in your cart 😅`);
    } else {
      setCart([...cart, product]);
      alert(`${product.name} added to cart ✅`);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛍️ Shop at StackKart</h1>

      <div style={styles.grid}>
        {sampleProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>₹{product.price}</p>
            <button onClick={() => addToCart(product)} style={styles.btn}>
              ➕ Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={() => navigate('/cart')} style={styles.cartBtn}>
          🛒 Go to Cart
        </button>
      </div>
    </div>
  );
};

export default Shop;

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#fef6ff',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.2rem',
    color: '#6a1b9a',
    marginBottom: '2.5rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '16px',
    width: '240px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'contain',
    marginBottom: '1rem',
  },
  name: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  price: {
    fontSize: '1rem',
    color: '#888',
    marginBottom: '1rem',
  },
  btn: {
    backgroundColor: '#6a1b9a',
    color: '#fff',
    padding: '0.6rem 1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cartBtn: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '0.75rem 2rem',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
