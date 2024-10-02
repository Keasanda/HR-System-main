import React, { useState, useEffect } from 'react';
import api from './api';
import './ManageProducts.css'; // Import a CSS file for styling
import { Link } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track which product is being edited

  // Fetch products on component load
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

  // Handle product update
  const handleUpdate = async (id) => {
    try {
      const updatedProduct = products.find((product) => product.id === id);
      await api.put(`http://localhost:5239/api/Products/${id}`, updatedProduct);
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:5239/api/Products/${id}`);
      setProducts(products.filter((product) => product.id !== id)); // Update the UI
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle product field changes (for editing)
  const handleFieldChange = (id, field, value) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  // Handle Save button click (saves all changes)
  const handleSaveAllChanges = async () => {
    for (const product of products) {
      await handleUpdate(product.id);
    }
    alert('All changes saved!');
  };

  return (
    <div className="manage-products-container">
      <h1>Manage Products</h1>
      <button className="save-changes-btn" onClick={handleSaveAllChanges}>
        Save All Changes
      </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.description} className="product-image" />
              </td>
              <td>
                <input
                  type="text"
                  value={product.description}
                  onChange={(e) => handleFieldChange(product.id, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.salePrice}
                  onChange={(e) => handleFieldChange(product.id, 'salePrice', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => handleFieldChange(product.id, 'category', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.qty}
                  onChange={(e) => handleFieldChange(product.id, 'qty', e.target.value)}
                />
              </td>
              <td>
                <button className="update-btn" onClick={() => handleUpdate(product.id)}>
                  Update
                </button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
