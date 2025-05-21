const jwt = require("jsonwebtoken");
const User = require("../model/User.js");

exports.authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.session;
    if (!token) {
      return res
        .status(401)
        .json({ statuscode: 401, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password ");
    if (!user) {
      return res.status(401).json({
        statuscode: 401,
        message: "Invalid AccessToken",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({
      statuscode: 401,
      message: error?.message || "Invalid access token",
    });
  }
};
