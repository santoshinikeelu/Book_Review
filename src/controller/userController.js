const User = require("../model/User.js");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { email, phone, firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      email,
      phone,
      firstName,
      lastName,
      password: hashedPassword,
    });

    if (!createdUser) {
      return res.status(400).json({
        statusCode: 400,
        message: "Something went wrong while registering the user",
      });
    }
    return res.status(201).json({
      statusCode: 201,
      message: "User Created Successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      statusCode: 500,
      message: "Something went wrong!!!",
      error: error.message,
    });
  }
};