import React, { useEffect, useState } from 'react';
import api from './api';
import './ProductsList.css';  
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FaHome } from 'react-icons/fa';
import { GiBookshelf } from "react-icons/gi";
import { FcManager } from "react-icons/fc";


const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Check if there are more products to load
  const [searchTerm, setSearchTerm] = useState(''); // Add search term state
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search was performed
  const navigate = useNavigate(); // Hook to navigate programmatically

  const fetchProducts = async (page) => {
    try {
      const response = await api.get(`/Products?page=${page}`);
      const newProducts = response.data;

      // Filter out products where quantity is zero
      const filteredProducts = newProducts.filter(product => product.qty > 0);

      // If no new products are returned, stop fetching more
      if (filteredProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...filteredProducts]);
        setFilteredProducts((prevProducts) => [...prevProducts, ...filteredProducts]); // Initially set filteredProducts to match the fetched ones
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

  // Function to handle clicking a product card and navigate to the CreateSale page
  const handleCardClick = (productId) => {
    navigate(`/products/${productId}/sale`); // Updated path
  };

  // Function to handle search when the button is clicked
  const handleSearch = () => {
    setSearchPerformed(true); // Indicate that a search has been performed

    // Filter products based on search term in Description or Category
    const filtered = products.filter(product => 
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered); // Update filteredProducts to match the search
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
        <h1 className="product-list-heading">Products List</h1>

        {/* Search input and button */}
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

        {/* Product Grid or No Results */}
        {searchPerformed && filteredProducts.length === 0 ? (
          <p>No products or categories found matching "{searchTerm}".</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card" 
                onClick={() => handleCardClick(product.id)} // Add onClick to navigate
                style={{ cursor: 'pointer' }} // Add cursor pointer to show it's clickable
              >
                <img src={product.image} alt={product.description} className="product-image" />
                <div className="product-info">
                  <h2 className="productfont">{product.description}</h2>
                  <p className="productfont">Category: {product.category}</p>
                  <p className="productfont" >Price: ${product.salePrice}</p>
                  <p className="productfont" >Qty: {product.qty}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasMore && <p>Loading more products...</p>}
      </main>
    </div>
  );
};

export default ProductsList;
