import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    // FETCH_ALL_BOOKS
    fetchBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // ADD_BOOK_REQUEST
    addBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.books.push(action.payload);
    },
    addBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // RESET
    resetBookSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

// FETCH ALL BOOKS
export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/bookandmanga/all",

      { withCredentials: true },
    );

    dispatch(bookSlice.actions.fetchBooksSuccess(data.book));
  } catch (error) {
    dispatch(
      bookSlice.actions.fetchBooksFailed(
        error.response?.data?.message || "Failed to fetch books",
      ),
    );
  }
};

// ADD BOOK
export const addBook = (formData) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/bookandmanga/admin/add",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );

    dispatch(bookSlice.actions.addBookSuccess(data.book));
  } catch (error) {
    dispatch(
      bookSlice.actions.addBookFailed(
        error.response?.data?.message || "Add book failed",
      ),
    );
  }
};
// RESET_FUNCTION
export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;
