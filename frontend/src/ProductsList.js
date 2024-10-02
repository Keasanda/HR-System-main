import React, { useEffect, useState } from 'react';
import api from './api';
import './ProductsList.css';  // Add a separate CSS file for styling
import { Link } from 'react-router-dom';



const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('http://localhost:5239/api/Products');

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/image-upload">Image Upload</Link></li>
            <li><Link to="/my-library">My Library</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Products List</h1>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.description} className="product-image" />
              <div className="product-info">
                <h2>{product.description}</h2>
                <p>Category: {product.category}</p>
                <p>Price: ${product.salePrice}</p>
                <p>Qty: {product.qty}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsList;
