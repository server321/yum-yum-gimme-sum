import "./index.css";
import Header from "../../components/header/index.jsx";
import Button from "../../components/button/index.jsx";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { removeFromCart, clearCart, setOrder } from "../../data/cartSlice";
import { usePlaceOrderMutation } from "../../data/menuApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Order() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const handleRemoveFromCart = (item, index) => {
    toast.error(`${item.name} removed from cart!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    dispatch(removeFromCart(index));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    const orderPayload = { items: cart.map((item) => item.id) };

    try {
      const response = await placeOrder(orderPayload).unwrap();

      dispatch(setOrder(response));
      dispatch(clearCart()); // Clear cart after successful order

      toast.success("Order placed successfully! Redirecting...", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(`/eta`); // Redirect to ETA page
      }, 1000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container container_grey">
      <ToastContainer />
      <Header
        logo_visible={true}
        cart_visible={true}
        cart_badge={cart.length}
      />

      <div className="order-container">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div
              className="order-item"
              key={index}
              onClick={() => handleRemoveFromCart(item, index)}
            >
              <div className="menu-item-title">
                <span>{item.name}</span>
                <span className="dots"></span>
                <span className="fira-sans-bold">{item.price} SEK</span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-cart">Your cart is empty</p>
        )}
      </div>

      <div className="total">
        <span>TOTAL</span>
        <span className="dots"></span>
        <span>{total} SEK</span>
      </div>
      <Button
        type={"next"}
        onClick={handleCheckout}
        disabled={isLoading}
        text={isLoading ? "Processing..." : "TAKE MY MONEY!"}
      />
    </div>
  );
}
