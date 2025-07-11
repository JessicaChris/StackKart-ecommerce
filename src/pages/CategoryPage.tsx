import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// 💅 Mock product data (replace with Supabase later)
const mockProducts: Record<string, { id: number; name: string; price: number; image: string }[]> = {
  fashion: [
    { id: 1, name: 'Trendy T-Shirt', price: 499, image: '/products/t-shirt.jpg' },
    { id: 2, name: 'Stylish Jeans', price: 899, image: '/products/jeans.jpg' },
  ],
  electronics: [
    { id: 3, name: 'Iphone', price: 80000, image: '/products/iphone.jpg' },
    { id: 4, name: 'Bluetooth Headphones', price: 45000, image: '/products/headphones.jpg' },
  ],
  books: [
    { id: 5, name: 'Atomic Habits', price: 399, image: '/products/atomic-habits.jpg' },
    { id: 6, name: 'The Cruel Prince', price: 350, image: '/products/The-Cruel-Prince.jpg' },
  ],
  food: [
    { id: 7, name: 'Chocolate Box', price: 249, image: '/products/chocolate.jpg' },
    { id: 8, name: 'Gourmet Cookies', price: 199, image: '/products/cookies.jpg' },
  ],
  gaming: [
    { id: 9, name: 'Gaming Mouse', price: 11299, image: '/products/gaming-mouse.jpg' },
    { id: 10, name: 'Gaming PC', price: 105000, image: '/products/pc.jpg' },
  ],
  'home decor': [
    { id: 11, name: 'Bean Bag', price: 799, image: '/products/bean-bag.jpg' },
    { id: 12, name: 'mirror', price: 2999, image: '/products/mirror.jpg' },
  ],
};

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<typeof mockProducts.fashion>([]);

  useEffect(() => {
    const formattedCategory = categoryName?.toLowerCase() || '';
    const data = mockProducts[formattedCategory as keyof typeof mockProducts];
    setProducts(data || []);
  }, [categoryName]);

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>{categoryName?.toUpperCase()} 🛍️</h1>

      {products.length === 0 ? (
        <p style={emptyStyle}>No products found in this category 💀</p>
      ) : (
        <div style={gridStyle}>
          {products.map((product) => (
            <div key={product.id} style={cardStyle}>
              <img src={product.image} alt={product.name} style={imgStyle} />
              <h3 style={productNameStyle}>{product.name}</h3>
              <p style={priceStyle}>₹{product.price}</p>
              <button style={btnStyle}>Add to Cart 🛒</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

const pageStyle: React.CSSProperties = {
  padding: '3rem 2rem',
  backgroundColor: '#fff',
  minHeight: '100vh',
  fontFamily: 'Poppins, sans-serif',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#6a1b9a',
  textAlign: 'center',
  marginBottom: '2rem',
};

const emptyStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#999',
  fontSize: '1rem',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1.5rem',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fdf4ff',
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  textAlign: 'center',
  transition: 'transform 0.2s',
};

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '180px',
  objectFit: 'contain', // 🔥 important for product images!
  borderRadius: '8px',
  backgroundColor: '#fff',
  marginBottom: '0.8rem',
  padding: '10px',
  display: 'block',
};


const productNameStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#333',
  margin: '0.5rem 0',
};

const priceStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  fontWeight: 600,
  color: '#6a1b9a',
  marginBottom: '1rem',
};

const btnStyle: React.CSSProperties = {
  backgroundColor: '#ff69b4',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 600,
};
