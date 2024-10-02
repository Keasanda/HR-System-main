import React, { useEffect, useState } from 'react';
import api from './api';
import './ProductsList.css'; // Reuse the CSS from ProductsList
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FaHome } from 'react-icons/fa';
import { GiBookshelf } from "react-icons/gi";
import { FcManager } from "react-icons/fc";

const TrackRecording = () => {
  const [products, setProducts] = useState([]);
  
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [hasMore, setHasMore] = useState(true); // Check if there are more products to load
  const navigate = useNavigate(); // Hook to navigate programmatically

  const fetchProducts = async (page) => {
    try {
      const response = await api.get(`/Products?page=${page}`);
      const newProducts = response.data;

      // If no new products are returned, stop fetching more
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch initial products
    fetchProducts(page);
  }, [page]);

  // Infinite scroll - detect when the user reaches the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  // Function to handle clicking a product card and navigate to the ProductSaleHistory page
  const handleCardClick = (productId) => {
    navigate(`/products/${productId}/sales-history`); // Updated path for sales history
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <nav>
          <ul>
       <li className="navlinks">   <FaHome /> <Link to="/"> Home</Link> </li>
            <li className="navlinks"> <GiBookshelf />      <Link to="/track-recording">TrackRecording</Link></li>
            <li className="navlinks" >   <FcManager />         <Link to="/manage-products">Manager Products</Link></li>
            
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Track Recording</h1>
        <div className="product-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => handleCardClick(product.id)} // Add onClick to navigate to ProductSaleHistory
              style={{ cursor: 'pointer' }} // Add cursor pointer to show it's clickable
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
        {hasMore && <p>Loading more products...</p>}
      </main>
    </div>
  );
};

export default TrackRecording;
