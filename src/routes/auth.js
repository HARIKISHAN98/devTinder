const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/User");
const validate = require("validator");

//SignUp API
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validate.isEmail(email)) {
      throw new Error("Enter a valid email");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.ValidatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      //create a token
      const token = await user.getJwt();
      //add the token in the cookie and send back as response to user
      res.cookie("token", token, {expires: new Date(Date.now() +  7*24*60*60*1000 )});
      res.status(200).send("Login Successful");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Logout API
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires : new Date(Date.now())});
  res.status(200).send("Logout SuCcessful");
})

module.exports = authRouter;
