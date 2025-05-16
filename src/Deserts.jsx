import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart } from './Store';
import './Deserts.css'; // Import the CSS file for styling

const Deserts = () => {
  // Use Redux to fetch the desert products from the global state
  const desertProducts = useSelector(state => state.products.Deserts);
  const dispatch = useDispatch();

  // Map over the desert products and create a card for each
  const desertList = desertProducts.map((product, index) => (
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

  return (
    <div className="Desert-products">
      <h1 style={{backgroundColor:"white",textAlign:"center"}}>Deserts</h1>
      <ul className="product-grid">
        {desertList}
      </ul>
    </div>
  );
};

export default Deserts;
