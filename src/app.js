const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const { trusted } = require("mongoose");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validate = require("validator");
const cookieParse = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/adminAuth");

app.use(express.json());
app.use(cookieParse());

//SignUp API
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    //Validate the request body
    validateSignUpData(req);
    //convert password into the hash
    const hashpassword = await bcrypt.hash(password, 10);
    // creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashpassword,
    });
    await user.save();
    res.send("Data added sucessfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

//Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validate.isEmail(email)) {
      throw new Error("Enter a valid email");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      //create a token
      const token = await jwt.sign({ _id: user._id }, "DEV@TINDER$790",{ expiresIn:"7d"});
      //add the token in the cookie and send back as response to user
      res.cookie("token", token, {expires: new Date(Date.now() +  7*24*60*60*1000 )});
      res.status(200).send("Login Successful");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//get profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//post sendConnectionRequest
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sended the connection Request");
  } catch (err) {
    res.status(400).send("ERROR :- " + err.message);
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
