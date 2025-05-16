import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';

function Home() {
  const products = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all products from all categories
  const allProducts = Object.values(products).flat();

  // Filter and randomize products
  const filteredProducts = allProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 8); // Show only 8 products

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>LOOKING for some good food</h1>
          <p>Your go-to spot for tasty treats & delights</p>
          <input
            type="text"
            placeholder="Search delicious food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </section>

      {/* Specials Title */}
      <h2 className="specials-title">🍽️ See Our Specials</h2>

      <section className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
