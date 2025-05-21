const dotenv = require("dotenv");
const connectDB = require("./database/mongo_connector.js");

const { app } = require("./app.js");
dotenv.config();
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
