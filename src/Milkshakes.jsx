import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart } from './Store';
import './Milkshakes.css'; // Import the CSS for card styling

const Milkshakes = () => {
  const milkshakeProducts = useSelector(globalState => globalState.products.Milkshakes);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(milkshakeProducts.length / productsPerPage);

  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = milkshakeProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Map over current products
  const milkshakeList = currentProducts.map((product, index) => (
    <li key={index} className="card">
      <div className="card-img">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="card-content">
        <h2>{product.name}</h2>
        <p className="card-price">Price: ₹{product.price}</p>
        <button className="add-to-cart" onClick={() => dispatch(addtocart(product))}>
          Add to cart
        </button>
      </div>
    </li>
  ));

  // Pagination controls
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', backgroundColor: 'white', color: 'black' }}>MILKSHAKES</h1>

      <ul className="product-grid">
        {milkshakeList}
      </ul>

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
    </>
  );
};

export default Milkshakes;
