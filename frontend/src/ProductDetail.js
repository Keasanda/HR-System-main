// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await api.get(`/Products/${id}`);
        setProduct(productResponse.data);

        const salesResponse = await api.get(`/ProductSales/${id}`);
        setSales(salesResponse.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.description}</h1>
      <p>Qty: {product.qty}</p>
      <p>Price: {product.salePrice}</p>
      <h3>Sales History:</h3>
      <ul>
        {sales.map((sale) => (
          <li key={sale.saleID}>
            Date: {new Date(sale.saleDate).toLocaleDateString()} - Qty: {sale.qty} - Sale Price: {sale.salePrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetail;
