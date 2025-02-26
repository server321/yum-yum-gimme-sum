import "./index.css";
import { Link } from "react-router-dom";
import Logo from "/yygs_white.svg";
import Basket from "/basket.svg";

function Header({ logo_visible = true, cart_visible = true, cart_badge = 0 }) {
  return (
    <header className="header">
      {/* Logo */}
      {logo_visible && (
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
      )}

      {/* Cart */}
      {cart_visible && (
        <Link to="/order" className="cart-container">
          <div className="cart-icon">
            <img src={Basket} alt="Shopping Cart" />
          </div>
          <span className="badge">{cart_badge}</span>
        </Link>
      )}
    </header>
  );
}

export default Header;
