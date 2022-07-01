import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/productConstants";

export const login = async(email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // data -> userDetails + success or error
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    if (data.success) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.userDetails,
      });
    }
    else{
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: data.error,
      });
    }

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {}
};
