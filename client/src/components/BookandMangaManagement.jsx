import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
} from "../store/slices/popUpSlice";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  resetBorrowSlice,
} from "../store/slices/borrowSlice";
import Header from "../layout/Header";

const BookandMangaManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, message, books } = useSelector((state) => state.book);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector(
    (state) => state.popup,
  );
  const {
    loading: borrowSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage,
  } = useSelector((state) => state.borrow);
  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const [borrowBookId, setBorrowBookId] = useState("");
  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };
  useEffect(() => {
    dispatch(fetchAllBooks());
    dispatch(fetchAllBorrowedBooks());
  }, [dispatch]);

  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
  }, [
    message,
    loading,
    borrowSliceLoading,
    borrowSliceMessage,
    error,
    borrowSliceError,
    dispatch,
  ]);

  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };
  const searchedBooks = (books || []).filter((book) => {
    return book.title.toLowerCase().includes(searchedKeyword);
  });

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        {/* SUB HEADER */}
        <header
          className="flex flex-col gap-3 
        md:flex-row md:justify-between md:items-center"
        >
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            {user && user.role === "Admin"
              ? "BOOK AND MANGA MANAGEMENT"
              : "BOOKS"}
          </h2>
          <div
            className="flex flex-col lg:flex-row lg:space-y-0
          lg:space-x-4"
          >
            {isAuthenticated && user && user.role === "Admin" && (
              <button
                onClick={() => dispatch(toggleAddBookPopup())}
                className="relative pl-14 w-full sm:w-52 flex gap-4 justify-center
              items-center py-2 px-4 bg-black text-white rounded-md 
              hover:bg-slate-700"
              >
                <span
                  className="bg-white flex justify-center items-center
                overflow-hidden rounded-full text-black w-[25px] h-[25px]
                text-[27px] absolute left-5"
                >
                  +
                </span>
                ADD NEW BOOK
              </button>
            )}
            <input
              type="text"
              placeholder="SEARCH BOOKS.."
              className="w-full
            sm:w-52 border p-2 border-gray-300 rounded-md"
              value={searchedKeyword}
              onChange={handleSearch}
            />
          </div>
        </header>
        {/* TABLE */}
        <div
          className="mt-6 overflow-auto bg-white rounded-md 
            shadow-lg "
        >
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">NAME</th>
                <th className="px-4 py-3 text-left">AUTHOR</th>
                {isAuthenticated && user?.role === "Admin" && (
                  <th className="px-4 py-3 text-left">QUANTITY</th>
                )}
                <th className="px-4 py-3 text-left">PRICE</th>
                <th className="px-4 py-3 text-left">AVAILABILITY</th>
                {isAuthenticated && user?.role === "Admin" && (
                  <th className="px-4 py-3 text-center">RECORD BOOK</th>
                )}
              </tr>
            </thead>
            <tbody>
              {searchedBooks.map((book, index) => (
                <tr
                  key={book._id}
                  className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  {isAuthenticated && user && user.role === "Admin" && (
                  <td className="px-4 py-3">{book.quantity}</td>
                )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        : ( "" )
      </main>
    </>
  );
};

export default BookandMangaManagement;
