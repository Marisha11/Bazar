import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartDetailsReducer } from "./reducers/cartReducer";
import {userLoginReducer} from "./reducers/userReducer";

// const cartItemsFromStorage = localStorage.getItem('cartItems')
// ? JSON.parse(localStorage.getItem('cartItems')) :  []

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cartDetails: cartDetailsReducer,
  user: userLoginReducer
});

// const initialState = {cart : {cartItems: cartItemsFromStorage}};
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
