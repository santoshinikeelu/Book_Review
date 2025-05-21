const express = require("express");
const {
  loginUser,
  logoutUser,
} = require("../controller/authController.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");

const authRoutes = express.Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/logout",authMiddleware, logoutUser);

  
module.exports = authRoutes;