import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { Book } from "../models/bookandmangaModel.js";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/fineCalculator.js";

export const recordBorrowedBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  // const { email } = req.body;
  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = req.user;

  // const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (book.quantity <= 0) {
    return next(new ErrorHandler("Book is currently unavailable", 400));
  }
  const isAlreadyBorrowed = user.borrowedBook.find(
    (b) => b.bookId.toString() === id && b.returned === false,
  );
  if (isAlreadyBorrowed) {
    return next(
      new ErrorHandler(
        "User has already borrowed this book and not returned it yet",
        400,
      ),
    );
  }
  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();
  user.borrowedBook.push({
    bookId: book._id,
    bookTitle: book.title,
    returned: false,
    borrowedDate: new Date(),
    dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
  });
  await user.save();
  await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    book: book._id,
    borrowedAt: new Date(),
    returned: false,
    dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    price: book.price,
  });
  res.status(200).json({
    success: true,
    message: "Book borrowed successfully",
  });
});

export const returnBorrowBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  // const { email } = req.body;
  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = req.user;
  // const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const borrowedBook = user.borrowedBook.find(
    (b) => b.bookId.toString() === id && b.returned === false,
  );
  if (!borrowedBook) {
    return next(new ErrorHandler("You haven't borrowed this book", 400));
  }
  borrowedBook.returnedAt = new Date();
  borrowedBook.returned = true;
  await user.save();
  book.quantity += 1;
  book.availability = book.quantity > 0;
  await book.save();
  const borrow = await Borrow.findOne({
    book: id,
    "user.id": user._id,
    returned: false,
  });
  if (!borrow) {
    return next(new ErrorHandler("You haven't borrowed this book", 404));
  }
  if (borrow.returned === true) {
    return next(new ErrorHandler("Book already returned", 400));
  }
  borrow.returnedAt = new Date();
  borrow.returned = true;
  const fine = calculateFine(borrow.dueDate);
  borrow.fine = fine;
  await borrow.save();
  res.status(200).json({
    success: true,
    message:
      fine === 0
        ? `Book returned successfully. No fine.`
        : `Book returned successfully. Total fine: ₹${fine}`,
    fine: fine,
  });
});

export const borrowBooks = catchAsyncErrors(async (req, res, next) => {
  const borrowBooks = await Borrow.find({ "user.id": req.user._id }).populate(
    "book",
  );
  res.status(200).json({
    success: true,
    borrowedBooks: borrowBooks,
  });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(
  async (req, res, next) => {
    const borrowBook = await Borrow.find().populate("book").populate("user.id");
    res.status(200).json({
      success: true,
      borrowBook,
    });
  },
);
