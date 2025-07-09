import React from 'react';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'TypeScript T-Shirt 👕',
    price: 799,
    image: '/products/shirt.jpg', // place this image inside /public/products/
  },
  {
    id: 2,
    name: 'React Mug ☕',
    price: 499,
    image: '/products/mug.jpg',
  },
  {
    id: 3,
    name: 'Dev Hoodie 🧥',
    price: 1099,
    image: '/products/hoodie.jpg',
  },
];

const Shop: React.FC = () => {
  const navigate = useNavigate();

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
    alert(`${product.name} added to cart ✅`);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛍️ Shop at StackKart</h1>
      <div style={styles.grid}>
        {sampleProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button style={styles.btn} onClick={() => addToCart(product)}>➕ Add to Cart</button>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button style={styles.cartBtn} onClick={() => navigate('/cart')}>🛒 Go to Cart</button>
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
    cursor: 'pointer',
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
