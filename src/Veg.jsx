import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Veg.css';
import { addtocart } from './Store';

const VegProducts = () => {
  const vegProducts = useSelector(globalState => globalState.products.Veg);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(vegProducts.length / productsPerPage);

  // Slice the products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = vegProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Render products
  const vegList = currentProducts.map((product, index) => (
    <div key={index} className="card">
      <img src={product.image} alt={product.name} className="card-img" />
      <div className="card-content">
        <h2>{product.name}</h2>
        <p className="card-price">Price: ₹{product.price}</p>
        <button className="add-to-cart" onClick={() => dispatch(addtocart(product))}>
          Add to cart
        </button>
      </div>
    </div>
  ));

  // Pagination controls
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage => currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage => currentPage + 1);
  };

  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className="veg-products">
      <h1 style={{ backgroundColor: "white" }}>VEGETARIAN PRODUCTS</h1>
      <div className="product-grid">
        {vegList}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default VegProducts;
