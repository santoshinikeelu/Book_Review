const express = require("express");
const {
  createUser
} = require("../controller/userController");

const userRoutes = express.Router();

userRoutes.post("/signup", createUser);
module.exports = userRoutes;
