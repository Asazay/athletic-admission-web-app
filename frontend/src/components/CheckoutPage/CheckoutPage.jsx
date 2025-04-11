import "./CheckoutPage.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createCheckoutThunk } from "../../store/checkout";
import { useLocation } from "react-router";

function CheckoutPage(eventData) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);
  const event = location.state.event;

  const handleCheckout = async (e) => {
    e.preventDefault();
    const res = await dispatch(createCheckoutThunk({
        eventPrice: event.price,
        parking: location.state.parking,
        parkingPrice: location.state.parkingPrice
    }))
      .then((res) => {
        if (res && res.url) {
          window.location.href = res.url;
        }
      })
      .catch((err) => {
        console.error("Error during checkout:", err);
      });
  };

  console.log(typeof event.price)

  return (
    event &&
    event.name &&
    event.price && (
      <section>
        <h1>Checkout</h1>
        <div class="product">
          <img src={event.imageUrl} alt="event image" />
          <div className="description">
            <h5>Admission Ticket - ${typeof event.price === 'number' ? event.price.toFixed(2) : parseFloat(event.price).toFixed(2)}</h5>
            <h5>
              Parking: {location.state.parking} - ${location.state.parkingPrice}
            </h5>
          </div>
        </div>
        <div>
          <button type="submit" id="checkout-button" onSubmit={(e) => handleCheckout(e)}>
            Checkout
          </button>
        </div>
      </section>
    )
  );
}

export default CheckoutPage;
