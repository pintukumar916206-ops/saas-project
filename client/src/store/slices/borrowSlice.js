import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    userBorrowedBooks: [],
    allBorrowedBooks: [],
    message: null,
  },
  reducers: {
    // FETCH_USER_BORROWED_BOOKS
    fetchUsersBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchUsersBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.userBorrowedBooks = action.payload;
    },
    fetchUsersBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RECORD BOOK
    recordBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    recordBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // FETCH ALL BORROWED (ADMIN)
    fetchAllBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.allBorrowedBooks = action.payload;
    },
    fetchAllBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RETURN BOOK
    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RESET
    resetBorrowSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

// MY_BORROW_BOOK-FUNCTION
export const fetchMyBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchUsersBorrowedBooksRequest());
  await axios
    .get("http://localhost:4000/api/v1/borrow/my-borrowed-books", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(
        borrowSlice.actions.fetchUsersBorrowedBooksSuccess(
          res.data.borrowedBooks,
        ),
      );
    })
    .catch((error) => {
      dispatch(
        borrowSlice.actions.fetchUsersBorrowedBooksFailed(
          error.response?.data?.message || "Something went wrong",
        ),
      );
    });
};

// ALL_BORROWED_BOOK_FUNCTION
export const fetchAllBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
  await axios
    .get("http://localhost:4000/api/v1/borrow/borrowed-books-by-users", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(
        borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowBook),
      );
    })
    .catch((error) => {
      dispatch(
        borrowSlice.actions.fetchUsersBorrowedBooksFailed(
          error.response?.data?.message || "Something went wrong",
        ),
      );
    });
};

// RECORD_BOOK_FUNCTION
export const recordBorrowedBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.recordBookRequest());
  await axios
    .post(
      `http://localhost:4000/api/v1/borrow/record/${id}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(borrowSlice.actions.recordBookSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        borrowSlice.actions.recordBookFailed(
          error.response?.data?.message || "Something went wrong",
        ),
      );
    });
};

// RETURN_BOOK
export const returnBorrowedBook = (email, bookId) => async (dispatch) => {
  dispatch(borrowSlice.actions.returnBookRequest());
  await axios
    .put(
      `http://localhost:4000/api/v1/borrow/return/${bookId}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
    .then((res) => {
      dispatch(borrowSlice.actions.returnBookSuccess(res.data.message));
    })
    .catch((error) => {
      dispatch(
        borrowSlice.actions.returnBookFailed(
          error.response?.data?.message || "Something went wrong",
        ),
      );
    });
};

// RESET_FUNCTION
export const resetBorrowSlice = () => (dispatch) => {
  dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;
