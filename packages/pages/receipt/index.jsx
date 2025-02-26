import "./index.css"; // Import CSS for styling
import Header from "../../components/header/index.jsx";
import Button from "../../components/button/index.jsx";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Logo2 from "/yum_logo_sticks.svg";

export default function Receipt() {
  const order = useSelector((state) => state.cart.order);

  const noOrder =
    !order || !order.order.items || order.order.items.length === 0;

  // Group items by ID
  const groupedItems = noOrder
    ? {}
    : order.order.items.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = { ...item, quantity: item.quantity || 1 };
        } else {
          acc[item.id].quantity += item.quantity || 1;
          acc[item.id].price += item.price * (item.quantity || 1); // Accumulate price
        }
        return acc;
      }, {});

  // Convert grouped items to an array
  const groupedItemsArray = Object.values(groupedItems);

  // Calculate total price
  const totalPrice = groupedItemsArray.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="container container_brown">
      <Header logo_visible={true} cart_visible={false} />

      {/* Receipt Box */}
      <div className="receipt">
        <div className="receipt-header">
          <img src={Logo2} alt="Receipt Logo" width="50" />
          <h2>KVITTO</h2>
          {!noOrder && <p className="order-id-receipt">#{order.order.id}</p>}
        </div>
        {noOrder ? (
          <div className="receipt-error">
            <p>No active order found!</p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="receipt-items">
              {groupedItemsArray.map((item, index) => (
                <div className="item" key={index}>
                  <span className="item-name">{item.name.toUpperCase()}</span>
                  <span className="dots"></span>
                  <span className="item-price">{item.price} SEK</span>
                  <p className="item-quantity">{item.quantity} stycken</p>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="receipt-total">
              <span>TOTALT</span>
              <span className="dots"></span>
              <span className="total-price">{totalPrice} SEK</span>
              <p>inkl 20% moms</p>
            </div>
          </>
        )}
      </div>

      {/* New Order Button */}
      <Link to="/">
        <Button
          type={"next"}
          onClick={() => {}}
          text={"GÖR EN NY BESTÄLLNING"}
        />
      </Link>
    </div>
  );
}
