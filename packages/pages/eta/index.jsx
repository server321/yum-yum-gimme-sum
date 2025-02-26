import "./index.css";
import Header from "../../components/header/index.jsx";
import Button from "../../components/button/index.jsx";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BoxTop from "/boxtop.png";

import { useSelector } from "react-redux";

export default function Eta() {
  const order = useSelector((state) => state.cart.order);

  if (!order || !order.order.eta || !order.order.id) {
    return (
      <div className="eta-container">
        <h2>No active order found!</h2>
        <Link to="/">Back to Menu</Link>
      </div>
    );
  }

  // Ensure `etaTime` is a valid date
  const etaTime = new Date(order.order.eta);
  if (isNaN(etaTime.getTime())) {
    console.error("Invalid ETA date:", order.eta);
    return (
      <div className="eta-container">
        <h2>ETA is unavailable!</h2>
        <Link to="/">Back to Menu</Link>
      </div>
    );
  }

  // Calculate ETA in minutes
  const calculateEta = () => {
    const currentTime = new Date();
    return Math.round((etaTime - currentTime) / 60000);
  };

  const [etaMinutes, setEtaMinutes] = useState(calculateEta);

  // Update ETA every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newEtaMinutes = calculateEta();

      // Stop countdown when ETA reaches 0
      if (newEtaMinutes <= 0) {
        setEtaMinutes(0);
        clearInterval(interval); // Stop updating
      } else if (newEtaMinutes !== etaMinutes) {
        setEtaMinutes(newEtaMinutes);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [etaMinutes]); // Only re-run when `etaMinutes` changes

  return (
    <>
      <div className="container container_brown">
        <Header logo_visible={true} cart_visible={false} />

        <div className="order-image">
          <img src={BoxTop} alt="Order Packaging"></img>
        </div>

        <div className="eta_block">
          <div>DINA WONTONS</div>
          <div>TILLAGAS!</div>
          <div className="eta-text">
            {etaMinutes > 0 ? (
              <>
                ETA <span id="eta-time">{etaMinutes} MIN</span>
              </>
            ) : (
              <span id="eta-time">Order Delivered</span> // Show when ETA reaches 0
            )}
          </div>
          <div className="order-id">#{order.order.id}</div>
        </div>

        <Link to="/">
          <Button
            type={"next"}
            onClick={() => {}}
            text={"GÖR EN NY BESTÄLLNING"}
          />
        </Link>

        <Link to="/receipt">
          <Button
            type={"next_transparent"}
            onClick={() => {}}
            text={"SE KVITTO"}
          />
        </Link>
      </div>
    </>
  );
}
