import axios from "axios";
import {
  registerSuccess,
  userFail,
  userRequest,
  userSuccess,
} from "../reducers/userReducer";

export const clearError = () => (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};

// Updated to accept navigate as a parameter

export const signIn = (data, navigate) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/user/signin",
      data
    );
    const { token } = response.data;
    localStorage.setItem("userToken", JSON.stringify({ userToken: token }));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(userSuccess(response.data));
    navigate("/");
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

export const signUp = (data, navigate) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/user/signup",
      data
    );
    dispatch(registerSuccess());
    navigate("/signin");
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};

export const getUserDetail = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await axios.get("http://localhost:4000/user", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userToken")).userToken
        }`,
      },
    });
    dispatch(userSuccess(response.data));
  } catch (error) {
    dispatch(userFail(error.response.data.message));
  }
};
