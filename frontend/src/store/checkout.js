import { csrfFetch } from "./csrf";
import {createSelector} from "reselect";

const CREATE_CHECKOUT = "checkout/CREATE_CHECKOUT";

const createCheckout = (checkout) => { 
  return {
    type: CREATE_CHECKOUT,
    payload: checkout,
  };
}

export const createCheckoutThunk = (checkout) => async (dispatch) => {
  const response = await csrfFetch("/api/server/create-checkout-session", {
    method: "POST",
    body: JSON.stringify(checkout),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createCheckout(data));
    return data;
  } else if (response.status < 500) {
    const errMsgs = await response.json();
    throw errMsgs;
  }
};

// Selector
const getEvent = state => state.events.singleEvent;
export const getEventSelector = createSelector(
  getEvent,
  (event) => {
    return event;
  }
);
// Reducer

const initialState = { checkout: null };
const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHECKOUT:
      return { ...state, checkout: action.payload };
    default:
      return state;
  }
};

export default checkoutReducer;