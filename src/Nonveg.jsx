import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Nonveg.css';
import { addtocart } from './Store';

const Nonveg = () => {
  const nonvegProducts = useSelector(globalState => globalState.products.NonVeg);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const totalPages = Math.ceil(nonvegProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = nonvegProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const nonvegList = currentProducts.map((product, index) => (
    <li key={index} className="card">
      <div className="card-img">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="card-content">
        <h2>{product.name}</h2>
        <p className="card-price">Price: ₹{product.price}</p>
        <button onClick={() => dispatch(addtocart(product))} className="add-to-cart">
          Add to cart
        </button>
      </div>
    </li>
  ));

  return (
    <>
      <div className="Nonveg-products">
        <h1 style={{ backgroundColor: "white", textAlign: "center" }}>Non-Veg Products</h1>
        <ul className="product-grid">{nonvegList}</ul>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active-page' : ''}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Nonveg;
