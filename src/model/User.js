const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
        type: String,
        required: true,
      },
    lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: Number,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength:6
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
