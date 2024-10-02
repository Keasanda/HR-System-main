import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';
import './ProductSalesHistory.css';  // Import the CSS file for styling

const ProductSalesHistory = () => {
  const { id } = useParams();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchSalesHistory = async () => {
      try {
        // Fetch product details (including image) along with the sales history
        const productResponse = await api.get(`/products/${id}`);

        setProduct(productResponse.data);
        
        const salesResponse = await api.get(`/ProductSales/product/${id}`);
        setSales(salesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales history:', error);
        setLoading(false);
      }
    };

    fetchSalesHistory();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="sales-history-container">
      {/* Product image and details */}
      {product && (
        <div className="product-info">
          <img src="/mnt/data/original-dcd8cfa11c69dbaa9695793ed8cc7fd8.jpg" alt={product.name} className="product-image" />
          <h1>{product.name}</h1>
        </div>
      )}

      {/* Validation for no sales */}
      {sales.length === 0 ? (
        <div className="no-sales">No sales history available for this product.</div>
      ) : (
        <div>
          <h2>Sales History</h2>
          <table className="sales-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.saleID}>
                  <td>#{sale.saleID}</td>
                  <td>{product.name}</td>
                  <td>x{sale.qty}</td>
                  <td>${sale.salePrice}</td>
                  <td>${(sale.salePrice * sale.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductSalesHistory;
