import { useDispatch, useSelector } from 'react-redux'; 
import React from 'react';
import './Beverages.css';  // Import the CSS for card styling
import { addtocart } from './Store';

const Beverages = () => {
  // Use Redux to fetch the beverages products from the global state
  let beverageProducts = useSelector(globalState => globalState.products.Beverages);
  let dispatch = useDispatch();

  // Map over the beverage products and create a card for each
  let beverageList = beverageProducts.map((product, index) => (
    <div key={index} className="card">
      <div className="card-img">
        <img src={product.image} alt={product.name} className="card-image" />
      </div>
      <div className="card-content">
        <h2>{product.name}</h2>
        <p className="card-price">Price: ₹{product.price}</p>
        <button className="add-to-cart" onClick={() => dispatch(addtocart(product))}>
          Add to cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className="Beverages-products">
      <h1 style={{ textAlign: 'center', backgroundColor: 'white', color: 'black' }}>BEVERAGES</h1>
      <div className="product-grid">
        {beverageList}
      </div>
    </div>
  );
};

export default Beverages;
