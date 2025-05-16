import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import About from "./About";
import Deserts from "./Deserts";
import Beverages from "./Beverages";
import Milkshakes from "./Milkshakes";
import Thickshakes from "./Thickshakes";
import "./App.css"; // Import the CSS file

import Home from "./Home";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import Orders from "./Orders";



function App() {

  const cartObjects = useSelector((globalState) => globalState.cart);
  let totoalCartValue =cartObjects.reduce((totalproducts,products)=>
  totalproducts+(products.quantity),0);
  return (
    <BrowserRouter>
      <div className="navbar">
        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">🏠Home</Link>
          <Link to="/veg" className="nav-link">🍛Veg</Link>
          <Link to="/nonveg" className="nav-link">🥩Non-Veg</Link>
          <Link to="/deserts" className="nav-link">🍮Deserts</Link>
          <Link to="/beverages" className="nav-link">🧃Beverages</Link>
          <Link to="/milkshakes" className="nav-link">🧋Milkshakes</Link>
          <Link to="/Thickshakes" className="nav-link">🥤Thickshakes</Link>
          <Link to="/Cart" className="nav-link">🛒Cart {totoalCartValue}</Link>
          <Link to="/orders" className="nav-link">orders</Link>
          <Link to="/about" className="nav-link">📄About</Link>
        </div>
      </div>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        <Route path="/deserts" element={<Deserts />} />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/milkshakes" element={<Milkshakes />} />
        <Route path="/Thickshakes" element={<Thickshakes />} />
        <Route path="/Cart" element={<Cart/>} />
         <Route path="/orders" element={<Orders/>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
