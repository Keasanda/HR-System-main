import React, { useState, useEffect } from 'react';
import api from './api';
import './ManageProducts.css'; // Import a CSS file for styling

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    description: '',
    salePrice: 0,
    category: '',
    image: '',
    qty: 0,
  });

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

  // Handle new product field change
  const handleNewProductFieldChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    try {
      const response = await api.post('http://localhost:5239/api/Products', newProduct);
      setProducts([...products, response.data]); // Add the new product to the product list
      alert('New product added successfully!');

      // Clear the form after adding
      setNewProduct({
        description: '',
        salePrice: 0,
        category: '',
        image: '',
        qty: 0,
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
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

      {/* Product Table */}
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
          
          {/* Row for adding a new product */}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => handleNewProductFieldChange('image', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => handleNewProductFieldChange('description', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Sale Price"
                value={newProduct.salePrice}
                onChange={(e) => handleNewProductFieldChange('salePrice', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => handleNewProductFieldChange('category', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Quantity"
                value={newProduct.qty}
                onChange={(e) => handleNewProductFieldChange('qty', e.target.value)}
              />
            </td>
            <td>
              <button className="save-btn" onClick={handleAddProduct}>
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button className="save-changes-btn" onClick={handleSaveAllChanges}>
        Save All Changes
      </button>
    </div>
  );
};

export default ManageProducts;
