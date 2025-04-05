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

  return (
    event &&
    event.name &&
    event.price && (
      <section>
        <h1>Checkout</h1>
        <div class="product">
          <img src={event.imageUrl} alt="event image" />
          <div className="description">
            <h5>Admission Ticket - ${event.price.toFixed(2)}</h5>
            <h5>
              Parking: {location.state.parking} - ${location.state.parkingPrice}
            </h5>
          </div>
        </div>
        <form onSubmit={(e) => handleCheckout(e)}>
          <button type="submit" id="checkout-button">
            Checkout
          </button>
        </form>
      </section>
    )
  );
}

export default CheckoutPage;
