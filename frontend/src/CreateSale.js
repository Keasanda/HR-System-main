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
    try {
      const saleData = {
        productId: product.id,
        salePrice: product.salePrice,
        qty: qty,
        saleDate: new Date(),
      };
      await api.post('http://localhost:5239/api/ProductSales', saleData);
      alert('Purchase completed successfully!');
    } catch (error) {
      console.error('Error making sale:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="checkout-container">
      <div className="sidebar"> 
        
      <nav>
          <ul>
       <li className="navlinks">   <FaHome /> <Link to="/"> Home</Link> </li>
            <li className="navlinks"> <GiBookshelf />      <Link to="/track-recording">TrackRecording</Link></li>
            <li className="navlinks" >   <FcManager />         <Link to="/manage-products">Manager Products</Link></li>
            
          </ul>
        </nav>
        
         </div>
      <div className="checkout-content">
        <div className="product-image-container">
          {product.image && <img src={product.image} alt={product.description} className="product-image" />}
        </div>
        <div className="product-info font">
          <h2 className="productMrgDescrip font" >{product.description}</h2>
          <p  className="productMrgCategory font" >Category: {product.category}</p>
          <p className="productMrgprice font"  >Price: ${product.salePrice}</p>
          <p  className="productMrg font"   >Available Quantity: {product.qty}</p>
        </div>
        <div className="purchase-section">
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={product.qty}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <button onClick={handlePurchase}>Confirm Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default CreateSale;
