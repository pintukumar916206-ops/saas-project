import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    message: null,
    isAuthenticated: false,
  },
  reducers: {
    // REGISTER_REQUEST
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // otp_VERIFICATION
    otpVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    otpVerificationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // LOGIN
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // LOGOUT
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // GET_USER
    getUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailure(state) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    // FORGOT_PASSWORD
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // RESET_PASSWORD
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailure(state,action) {
      state.loading = false;
      state.error = action.payload;
    },
    // UPDATE_PASSWORD
    updatePasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // RESET_AUTHENTICATION
    resetAuthSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.user = state.user;
      // state.isAuthenticated = isAuthenticated;
    },
  },
});

// RESET_AUTH_SLICE_FUNCTION
export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};
// REGISTER_REQUEST_FUNCTION
export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  await axios
    .post("http://localhost:4000/api/v1/auth/register", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.registerFailure(error.response.data.message));
    });
};
// otp_VERIFICATION_FUNCTION
export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.otpVerificationRequest());
  await axios
    .post(
      "http://localhost:4000/api/v1/auth/verify-otp",
      { email, otp },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.otpVerificationFailure(error.response.data.message),
      );
    });
};
// LOGIN_FUNCTION
export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  await axios
    .post("http://localhost:4000/api/v1/auth/login", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.loginSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authSlice.actions.loginFailure(error.response.data.message));
    });
};
// LOGOUT_FUNCTION
export const logout = (data) => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  await axios
    .get("http://localhost:4000/api/v1/auth/logout", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(authSlice.actions.logoutSuccess(res.data.message));
      dispatch(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
      dispatch(authSlice.actions.logoutFailure(error.response.data.message));
    });
};
// GET_USER
export const getUser = (data) => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  await axios
    .get("http://localhost:4000/api/v1/auth/me", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(authSlice.actions.getUserSuccess(res.data));
    })
    .catch((error) => {
  if (error.response?.status === 401) {
    dispatch(authSlice.actions.getUserFailure());
  } else {
    dispatch(
      authSlice.actions.getUserFailure(error.response?.data?.message)
    );
  }
});
};
// FORGOT_PASSWORD_FUNCTION
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  await axios
    .post(
      "http://localhost:4000/api/v1/auth/forgot-password",
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.forgotPasswordFailure(error.response.data.message),
      );
    });
};
// RESET_PASSWORD_FUNCTION
export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  await axios
    .put(`http://localhost:4000/api/v1/auth/reset-password/${token}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.resetPasswordFailure(error.response.data.message),
      );
    });
};
// UPDATE_PASSWORD_FUNCTION
export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  await axios
    .put("http://localhost:4000/api/v1/auth/password/update", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        authSlice.actions.updatePasswordFailure(error.response.data.message),
      );
    });
};

export default authSlice.reducer;