import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';  // Correct import for API, assuming it is now inside the src directory

function CreateSale() {
  // Define state variables for salePrice and qty
  const [productId, setProductId] = useState('');  // Assuming productId is passed or selected
  const [salePrice, setSalePrice] = useState('');
  const [qty, setQty] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saleData = {
        productId,
        salePrice,
        qty
      };
      
      await api.post('/sales', saleData);
      navigate('/products');  // Redirect to product list after successful sale creation
    } catch (error) {
      console.error('Error creating sale', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product ID:</label>
        <input 
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Sale Price:</label>
        <input 
          type="number"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Quantity:</label>
        <input 
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          required
        />
      </div>

      <button type="submit">Create Sale</button>
    </form>
  );
}

export default CreateSale;
