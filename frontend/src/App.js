import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import the new components for the sale tracking system
import ProductsList from './ProductsList';   // New Products List component
import ProductDetail from './ProductDetail'; // New Product Detail component
import CreateSale from './CreateSale';       // New Create Sale component
import ManageProducts  from './ManageProducts';
import TrackRecording from './TrackRecording';
import ProductSalesHistory from './ProductSalesHistory';

function App() {
  return (
    <Router>
      <Routes>
        {/* Your existing routes */}
        <Route path="/" element={<ProductsList />} />
  
        {/* New routes for the sale tracking system */}
        <Route path="/products" element={<ProductsList />} />   {/* Product list page */}
        <Route path="/products/:id" element={<ProductDetail />} /> {/* Product details page */}
        <Route path="/products/:id/sale" element={<CreateSale />} /> {/* Create sale page */}
       

        <Route path="/manage-products" element={<ManageProducts />} /> {/*Manages products*/}

        <Route path="/track-recording" element={<TrackRecording />} /> {/* New track recording route */}
        <Route path="/products/:id/sales-history" element={<ProductSalesHistory />} /> {/* New sales history route */}

      </Routes>
    </Router>
  );
}

export default App;
