const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User does not exist !!" });
    }
    if (user.isDeleted === true || user.status === "inactive") {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User has been deleted/Inactive." });
    }
    let isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Invalid password credential" });
    }
    user.password = undefined;
    const token = await jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("session", token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      statusCode: 200,
      message: "User logged In Successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message || "An error occurred",
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, {
      $unset: {
        accessToken: null,
      },
    });

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      domain: "3.111.14.195",
    };

    // Clear the session cookie
    res.clearCookie("session", options);

    return res.status(200).json({
      statusCode: 200,
      message: "User logged Out Successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message || "An error occurred",
    });
  }
};
