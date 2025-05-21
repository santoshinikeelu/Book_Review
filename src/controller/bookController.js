const Book = require("../model/Book");
const Review = require("../model/Review");

exports.createBook = async (req, res) => {
  try {
    console.log(req.user);
    const book = await Book.create(req.body);
    res.status(201).json({
      statusCode: 201,
      message: "Book Created Successfully",
      data: book,
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { search, author, genre } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const searchRegex = search ? new RegExp(`^${search}`, "i") : null;
    const query = {
      ...(search && { title: searchRegex }),
    };
    if (author) query.author = author;
    if (genre) query.genre = genre;
    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(skip)
      .lean();

    const results = books.length;
    const count = await Book.countDocuments(query);
    const lastPage = Math.ceil(count / pageSize);
    const shouldFetchMoreData = skip + results < count;
    res.status(200).json({
      statusCode: 200,
      message: "Book fetched Successfully",
      data: books,
      results,
      count,
      lastPage,
      hasNextPage: shouldFetchMoreData,
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const book = await Book.findById(bookId).populate("reviews");
    if (!book) return res.status(404).json({ message: "Book not found" });

    const reviews = await Review.find({ book: book._id })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(skip)
      .lean();
    const avgRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

    res.status(200).json({
      statusCode: 200,
      message: "Books review fetched successfully",
      data: {
        ...book.toObject(),
        averageRating: avgRating.toFixed(0),
        reviews,
      },
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
