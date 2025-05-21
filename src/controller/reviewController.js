const Review = require("../model/Review");

exports.addReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      book: req.params.bookid,
      user: req.user._id,
    });

    res.status(201).json({
      statusCode: 201,
      message: "Review added successfully",
      data: review,
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!review) {
      return res.status(403).json({
        statusCode: 403,
        message: "Not allowed to update this review",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Review updated successfully",
      data: review,
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const result = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!result) {
      return res.status(403).json({
        statusCode: 403,
        message: "Not allowed to delete this review",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Review deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
