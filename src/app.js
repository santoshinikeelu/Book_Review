const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();


app.use(express.json());
app.use(cookieParser());

//routes import
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const bookRoutes = require("./routes/bookRoute");
const reviewRoutes = require("./routes/reviewRoute");

app.get("/", (req, res) => {
  res.send("Hello Worlxzxzd!");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/review", reviewRoutes);

module.exports = { app };
