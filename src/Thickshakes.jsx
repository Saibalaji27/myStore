import { useDispatch, useSelector } from 'react-redux'; 
import React from 'react';
import './Thickshakes.css'; // Import the CSS for card styling
import { addtocart } from './Store';

const Thickshakes = () => {
  // Use Redux to fetch the thickshakes products from the global state
  let thickshakeProducts = useSelector(globalState => globalState.products.Thickshakes);
  let dispatch =useDispatch();
  // Map over the thickshake products and create a card for each
  let thickshakeList = thickshakeProducts.map((product, index) => (
    <div key={index} className="card">
      <div className="card-img">
        <img src={product.image} alt={product.name} className="card-image" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{product.name}</h2>
        <p className="card-price">Price: ₹{product.price}</p>
        <button className="add-to-cart" onClick={()=>dispatch(addtocart(product))}>Add to cart</button>
      </div>
    </div>
  ));

  return (
    <div className="product-container">
      <h1 style={{ textAlign: 'center', backgroundColor: 'white', color: 'black' }}>THICKSHAKES</h1>
      <div className="product-grid">
        {thickshakeList}
      </div>
    </div>
  );
};

export default Thickshakes;
