import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toggleAddNewAdminPopup } from "./popUpSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {
    // FETCH_ALL_USERS
    fetchAllUsersRequest(state) {
      state.loading = true;
    },
    fetchAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllUsersFailure(state) {
      state.loading = false;
    },
    // ADD_ADMIN
    addNewAdminRequest(state) {
      state.loading = true;
    },
    addNewAdminSuccess(state, action) {
      state.loading = false;
      state.users.push(action.payload);
    },
    addNewAdminFailure(state) {
      state.loading = false;
    },
  },
});

// FETCH_ALL_FUNCTION
export const fetchAllUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchAllUsersRequest());
  await axios
    .get(" http://localhost:4000/api/v1/user/all ", { withCredentials: true })
    .then((res) => {
      dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.users));
    })
    .catch((error) => {
      dispatch(
        userSlice.actions.fetchAllUsersFailure(err.response.data.message),
      );
      toast.error(error.response.data.message);
    });
};

// ADD_ADMIN_FUNCTION
export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(userSlice.actions.addNewAdminRequest());
  await axios
    .post("http://localhost:4000/api/v1/user/add/new/admin", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(userSlice.actions.addNewAdminSuccess());
      toast.success(res.data.message);
      dispatch(toggleAddNewAdminPopup())
    })
    .catch((error) => {
      userSlice.actions.addNewAdminFailure();
      toast.error(error.response.data.message);
    });
};



export default userSlice.reducer;