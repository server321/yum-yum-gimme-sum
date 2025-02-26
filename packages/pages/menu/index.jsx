import "./index.css";
import Header from "../../components/header/index.jsx";

import { useGetMenuItemsQuery } from "../../data/menuApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../data/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Menu() {
  const { data, error, isLoading } = useGetMenuItemsQuery();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu.</div>;

  const menuItems = data?.items || [];

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <div className="container container_background">
        <ToastContainer />

        <Header
          logo_visible={true}
          cart_visible={true}
          cart_badge={cart.length}
        />

        <div className="menu-container">
          <div className="menu-header">MENY</div>

          {menuItems
            .filter((item) => item.type === "wonton")
            .map((item, index) => (
              <div
                className="menu-item"
                key={index}
                onClick={() => handleAddToCart(item)}
              >
                <div className="menu-item-title">
                  <span>{item.name}</span>
                  <span className="dots"></span>
                  <span className="fira-sans-bold">{item.price} SEK</span>
                </div>

                <p className="ingredients">
                  {item.ingredients
                    ? item.ingredients.join(", ")
                    : "No ingredients available"}
                </p>
              </div>
            ))}

          <div className="menu-item">
            <div className="menu-item-title">
              <span>Dip sås</span>
              <span className="dots"></span>
              <span className="fira-sans-bold">19 SEK</span>
            </div>
          </div>

          <div className="sauces_drinks_list">
            {menuItems
              .filter((item) => item.type === "dip")
              .map((item, index) => (
                <span
                  key={index}
                  className="sauce"
                  onClick={() => handleAddToCart(item)}
                >
                  {item.name}
                </span>
              ))}
          </div>

          <div className="menu-item">
            <div className="menu-item-title">
              <span>Drink</span>
              <span className="dots"></span>
              <span className="fira-sans-bold">19 SEK</span>
            </div>
          </div>

          <div className="sauces_drinks_list">
            {menuItems
              .filter((item) => item.type === "drink")
              .map((item, index) => (
                <span
                  key={index}
                  className="sauce"
                  onClick={() => handleAddToCart(item)}
                >
                  {item.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
