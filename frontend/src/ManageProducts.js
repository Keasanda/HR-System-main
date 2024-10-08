import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { GiBookshelf } from 'react-icons/gi';
import { FcManager } from 'react-icons/fc';
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
  const [validationMessages, setValidationMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  const categories = ['Fruits', 'Vegetable'];

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

  const handleUpdate = async (id) => {
    try {
      const updatedProduct = products.find((product) => product.id === id);
      await api.put(`http://localhost:5239/api/Products/${id}`, updatedProduct);
      setSuccessMessage('Updated successfully!'); // Set success message
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:5239/api/Products/${id}`);
      setProducts(products.filter((product) => product.id !== id)); // Update the UI
      setSuccessMessage('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleFieldChange = (id, field, value) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  const handleNewProductFieldChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleAddProduct = async () => {
    const messages = [];

    if (!newProduct.description) messages.push("Description is required.");
    if (newProduct.salePrice <= 0) messages.push("Sale Price must be greater than zero.");
    if (!newProduct.category) messages.push("Category is required.");
    if (!newProduct.image) messages.push("Image URL is required.");
    if (newProduct.qty < 0) messages.push("Quantity cannot be negative.");

    if (messages.length > 0) {
      setValidationMessages(messages);
      return;
    }

    setValidationMessages([]); // Clear validation messages

    try {
      const response = await api.post('http://localhost:5239/api/Products', newProduct);
      setProducts([...products, response.data]); // Add the new product to the product list
      setSuccessMessage('New product added successfully!'); // Set success message

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

  const handleSaveAllChanges = async () => {
    for (const product of products) {
      await handleUpdate(product.id);
    }
    setSuccessMessage('All changes saved!');
  };

  return (
    <div className="manage-products-container">
   <aside className="sidebar manage">
  <img src="https://i.pinimg.com/736x/59/98/56/599856512197aadb4dfe73bc97a7d95a.jpg" alt="Logo" className="logopic" />
  <nav>
    <ul>
      <li className="navlinks">
        <FaHome /> <Link to="/">Home</Link>
      </li>
      <li className="navlinks"> <GiBookshelf /> <Link to="/track-recording">Product Tracking</Link></li>
      <li className="navlinks"> <FcManager /> <Link to="/manage-products">Product Management  </Link></li>
    </ul>
  </nav>
</aside>


      <div className="content">
        <h1>Manage Products</h1>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {validationMessages.length > 0 && (
          <div className="validation-messages">
            {validationMessages.map((msg, index) => (
              <p key={index} className={`validation-error ${msg.includes("successfully") ? 'success' : 'error'}`}>
                {msg}
              </p>
            ))}
          </div>
        )}

        <div className="top-buttons">
          <button className="save-changes-btn" onClick={handleSaveAllChanges}>
            Save All Changes
          </button>
      
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Category</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.description} className="manage-product-image" />
                </td>
                <td>
                  <select
                    value={product.category}
                    onChange={(e) => handleFieldChange(product.id, 'category', e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
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
                    value={product.qty}
                    onChange={(e) => handleFieldChange(product.id, 'qty', e.target.value)}
                  />
                </td>
                <td>{Number(product.salePrice).toFixed(2)}</td>
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
                <select
                  value={newProduct.category}
                  onChange={(e) => handleNewProductFieldChange('category', e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
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
                  placeholder="Quantity"
                  value={newProduct.qty}
                  onChange={(e) => handleNewProductFieldChange('qty', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Sale Price"
                  step="0.01"
                  value={newProduct.salePrice}
                  onChange={(e) => handleNewProductFieldChange('salePrice', e.target.value)}
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
      </div>
    </div>
  );
};

export default ManageProducts;
