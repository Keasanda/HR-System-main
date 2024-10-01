// src/components/ProductsList.js
import React, { useEffect, useState } from 'react';
import api from './api';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/Products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.description}</Link> - 
            Qty: {product.qty} - Price: {product.salePrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
