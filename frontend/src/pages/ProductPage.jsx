import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingCart } from 'lucide-react'; // Professional Icons

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams(); // Gets the ID from the URL (/product/123)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="product-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back Button */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#666', marginBottom: '2rem' }}>
        <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back to Products
      </Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        {/* Left Side: Product Image */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          />
        </div>

        {/* Right Side: Product Details */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.name}</h1>
          <p style={{ color: '#888', fontWeight: 'bold' }}>Brand: {product.brand}</p>
          <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />
          
          <h2 style={{ fontSize: '1.8rem', color: '#2ecc71' }}>${product.price}</h2>
          <p style={{ lineHeight: '1.6', margin: '1.5rem 0', color: '#444' }}>{product.description}</p>

          <div style={{ border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Status:</span>
              <span style={{ fontWeight: 'bold', color: product.countInStock > 0 ? 'green' : 'red' }}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <button 
              disabled={product.countInStock === 0}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: product.countInStock > 0 ? '#333' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontSize: '1rem'
              }}
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;