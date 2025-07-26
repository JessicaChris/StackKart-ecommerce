import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5069/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart];
    const index = updatedCart.findIndex((item: CartItem) => item.id === product.id);

    if (index !== -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setMessage(`${product.name} added to cart ✅`);

    // Clear message after 2 sec
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛍️ Shop at StackKart</h1>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {loading && <p style={{ textAlign: 'center' }}>Loading products... ⏳</p>}

      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div style={styles.grid}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                ...styles.card,
                ...(hoveredCard === product.id ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img
                src={product.image || '/products/default.jpg'}
                alt={product.name}
                style={styles.image}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button
                style={{
                  ...styles.btn,
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onClick={() => addToCart(product)}
                disabled={loading}
              >
                ➕ Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button style={styles.cartBtn} onClick={() => navigate('/cart')}>
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
    fontFamily: 'Poppins',
    backgroundColor: '#fff8fc',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#6a1b9a',
    marginBottom: '2rem',
  },
  message: {
    textAlign: 'center',
    color: '#6a1b9a',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  grid: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '12px',
    width: '220px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'contain',
    marginBottom: '1rem',
  },
  btn: {
    backgroundColor: '#6a1b9a',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  cartBtn: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
