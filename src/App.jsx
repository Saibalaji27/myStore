import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Veg from "./Veg";
import Nonveg from "./Nonveg";
import About from "./About";
import Deserts from "./Deserts";
import Beverages from "./Beverages";
import Milkshakes from "./Milkshakes";
import Thickshakes from "./Thickshakes";
import Home from "./Home";
import Cart from "./cart";
import Orders from "./Orders";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const toggleMenu = () => {
    document.getElementById("navLinks").classList.toggle("active");
  };

  const cartObjects = useSelector((state) => state.cart);
  const totoalCartValue = cartObjects.reduce((total, product) => total + product.quantity, 0);

  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="logo">MyBrand</div>
        <nav className="nav-links" id="navLinks">
          <Link to="/" className="nav-link">🏠 Home</Link>
          <Link to="/veg" className="nav-link">🍛 Veg</Link>
          <Link to="/nonveg" className="nav-link">🥩 Non-Veg</Link>
          <Link to="/deserts" className="nav-link">🍮 Deserts</Link>
          <Link to="/beverages" className="nav-link">🧃 Beverages</Link>
          <Link to="/milkshakes" className="nav-link">🧋 Milkshakes</Link>
          <Link to="/Thickshakes" className="nav-link">🥤 Thickshakes</Link>
          <Link to="/Cart" className="nav-link">🛒 Cart ({totoalCartValue})</Link>
          <Link to="/orders" className="nav-link">📦 Orders</Link>
          <Link to="/about" className="nav-link">📄 About</Link>
        </nav>
        <button className="hamburger" onClick={toggleMenu}>☰</button>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        <Route path="/deserts" element={<Deserts />} />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/milkshakes" element={<Milkshakes />} />
        <Route path="/Thickshakes" element={<Thickshakes />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
