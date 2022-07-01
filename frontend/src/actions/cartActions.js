import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAILURE,
  CART_UPDATE_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SHIPPING_ADDRESS_REQUEST,
  CART_SHIPPING_ADDRESS_SUCCESS,
  CART_SHIPPING_ADDRESS_FAILURE,
} from "../constants/productConstants";

export const saveCartDataToDB = async (id, qty) => {
  // add item in sql database
  const cartItemToSave = {
    userId: 1,
    productId: id,
    productQuantity: qty,
  };
  await axios.post("/api/cart", cartItemToSave);
  console.log("Saved cart item to DB");
};

export const saveShippingAddressDataToDB = async (userId, address) => {
  // add item in sql database
  const shippingAddressToSave = {
    userId: 1,
    shippingAddress: address,
  };
};

// get the shipping address data and dispatch corresponding action
export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    console.log("In dispatch, before saving to db");
    await axios.post("/api/shippingAddress", { ...data, userId: 1 });
    console.log("Saved Shipping Address to DB");
  } catch (error) {
    console.log(error);
  }
};

export const getShippingAddress = (userId) => async (dispatch) => {
  try {
    dispatch({ type: CART_SHIPPING_ADDRESS_REQUEST });
    const { data } = await axios.get(`/api/shippingAddress/${userId}`);
    dispatch({
      type: CART_SHIPPING_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_SHIPPING_ADDRESS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get the product id and the quantity of the item to add to the cart
export const addItem = async (dispatch, id, qty) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    // add item in redux
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        productId: data.id,
        productQuantity: qty,
        userId: 1,
      },
    });

    //import {v4} from 'uuid'; => v4()
    // add item in sql database
    saveCartDataToDB(id, qty);
  } catch (error) {
    console.error(error);
  }
};

export const updateItem = (dispatch, id, qty) => {
  try {
    // update item in redux
    dispatch({
      type: CART_UPDATE_ITEM,
      payload: {
        productId: id,
        productQuantity: qty,
        userId: 1,
      },
    });
    saveCartDataToDB(id, qty);
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = async (dispatch, id) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        productId: id,
      },
    });
    axios.delete(`/api/cart/${id}`);
  } catch (error) {}
};

export const listCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: CART_DETAILS_REQUEST });
    const { data } = await axios.get("/api/cart");
    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
