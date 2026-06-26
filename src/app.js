const express = require("express");
const connectDB = require("./config/database");
const { trusted } = require("mongoose");
const app = express();
const cookieParse = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/adminAuth");

app.use(express.json());
app.use(cookieParse());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database Connection Established...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be Connected...");
  });
