import React, { useEffect, useState } from 'react';
import api from './api';
import './ProductsList.css';  
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { GiBookshelf } from "react-icons/gi";
import { FcManager } from "react-icons/fc";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const productsPerPage = 8; // Number of products per page

  const navigate = useNavigate();

  // Fetch all products initially
  const fetchProducts = async () => {
    try {
      const response = await api.get('/Products');
      const filteredProducts = response.data.filter(product => product.qty > 0);
      setProducts(filteredProducts);
      setFilteredProducts(filteredProducts); // Initially set filtered products to all products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products); // Reset to all products if search is empty
      return;
    }

    const filtered = products.filter(product => 
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setPage(1); // Reset to page 1 after search
  };

  // Pagination logic
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle navigation between pages
  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - 1); // Show previous page
    const endPage = Math.min(totalPages, page + 2); // Show next two pages

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${i === page ? 'active' : ''}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li className="navlinks"><FaHome /> <Link to="/"> Home</Link></li>
            <li className="navlinks"><GiBookshelf /> <Link to="/track-recording">TrackRecording</Link></li>
            <li className="navlinks"><FcManager /> <Link to="/manage-products">Manager Products</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h1 className="product-list-heading">Products List</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by description or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {/* Product Grid */}
        {currentProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="product-grid">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/products/${product.id}/sale`)}
              >
                <img src={product.image} alt={product.description} className="product-image" />
                <div className="product-info">
                  <h2>{product.description}</h2>
                  <p>Category: {product.category}</p>
                  <p>Price: ${product.salePrice}</p>
                  <p>Qty: {product.qty}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={page === 1}>
            Previous
          </button>
          {renderPageNumbers()}
          <button onClick={goToNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductsList;
