const express = require("express");
const connectDB = require("./config/database");
const User = require("./utils/User");
const app = express();

app.post("/signup", async (req, res) => {
  //creating a new instance of User model
  const user = new User({
    firstName: "Hunny",
    lastName: "Mittal",
    email: "hunny@mittal.com",
    password: "hunny123",
  });
  try {
    await user.save();
    res.send("Data added sucessfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

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
