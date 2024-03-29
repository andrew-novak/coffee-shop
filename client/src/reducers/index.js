import { combineReducers } from "redux";

import products from "./products";
import product from "./product";
import cart from "./cart";
import cartDetails from "./cartDetails";
import { RESET_STATE } from "constants/actionTypes";

const appReducer = combineReducers({
  products,
  product,
  cart,
  cartDetails,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    // Reset everythign exept 'cart' state
    state = { cart };
  }
  return appReducer(state, action);
};

export default rootReducer;
