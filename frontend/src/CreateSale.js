import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useParams } from 'react-router-dom';
import api from './api';
import './CreateSale.css'; // Import the CSS file for styling
import { FaHome } from 'react-icons/fa';
import { GiBookshelf } from "react-icons/gi";
import { FcManager } from "react-icons/fc";

const CreateSale = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`http://localhost:5239/api/Products/${id}`);
        console.log('Product data:', response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePurchase = async () => {
    if (qty < 1 || isNaN(qty)) {
      setErrorMessage('Quantity must be greater than or equal to 1.');
      return;
    }
  
    try {
      const saleData = {
        productId: product.id,
        salePrice: product.salePrice,
        saleQty: qty, 
        saleDate: new Date(),
      };
      await api.post('http://localhost:5239/api/ProductSales', saleData);
      setSuccessMessage('Purchase completed successfully');
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      // Check if the error response contains a specific message from the backend
      if (error.response && error.response.data) {
        setErrorMessage('Not enough quantity in stock'); // Display the error message from backend
      } else {
        setErrorMessage('An error occurred while making the sale.');
      }
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    
    // Reset error message when input is corrected
    setErrorMessage('');
    
    if (value < 1) {
      setErrorMessage('Quantity must be at least 1.');
    } else if (isNaN(value)) {
      setErrorMessage('Please enter a valid number.');
    } else {
      setQty(value);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="checkout-container">
      {/* Success message display at the top right */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className="sidebar"> 
        <nav>
          <ul>
            <li className="navlinks"><FaHome /> <Link to="/">Home</Link></li>
            <li className="navlinks"><GiBookshelf /><Link to="/track-recording">TrackRecording</Link></li>
            <li className="navlinks"><FcManager /><Link to="/manage-products">Manage Products</Link></li>
          </ul>
        </nav>
      </div>
      
      <div className="checkout-content">
        <div className="product-image-container">
          {product.image && <img src={product.image} alt={product.description} className="product-image" />}
        </div>
        <div className="product-info font">
          <h2 className="productMrgDescrip font">{product.description}</h2>
          <p className="productMrgCategory font">Category: {product.category}</p>
          <p className="productMrgprice font">Price: R{product.salePrice}</p>
          <p className="productMrg font">Available Quantity: {product.qty}</p>
        </div>

        <div className="purchase-section">
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={product.qty}
            value={qty}
            onChange={handleQuantityChange}
          />
         
          <button onClick={handlePurchase} disabled={qty < 1 || isNaN(qty)}>Confirm Purchase</button>

         

        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default CreateSale;
