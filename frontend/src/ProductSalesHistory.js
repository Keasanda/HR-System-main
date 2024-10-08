import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate
import api from './api';
import './ProductSalesHistory.css';  // Import the CSS file for styling

const ProductSalesHistory = () => {
  const { id } = useParams();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

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
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image" 
      />
      <h1>{product.name}</h1>
    </div>
  )}

  {/* Validation for no sales */}
  {sales.length === 0 ? (
    <div className="no-sales">No sales history available for this product.</div>
  ) : (
    <div>




      {/* Back to TrackingRecording button in its container */}
      <div className="back-button-container">

        
<h1 className="Saleshistory">Sales History</h1>
        <button className="back-button" onClick={() => navigate('/track-recording')}>
          Back to TrackingRecording
        </button>

        
      </div>

     

      <table className="sales-table">
        <thead>
          <tr>
            <th>Product Description</th>
            <th>Sold Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Sale Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.saleID}>
              <td>{product.description}</td>
              <td>x{sale.saleQty}</td>
              <td>R{sale.salePrice}</td>
              <td>R{(sale.salePrice * sale.saleQty).toFixed(2)}</td>
              <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
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
