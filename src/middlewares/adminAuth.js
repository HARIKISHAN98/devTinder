const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    //get the token from the cookie
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token is Invalid");
    }
    //validate token
    const decodedData = await jwt.verify(token, "DEV@TINDER$790");
    const { _id } = decodedData;

    //find the user and send
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not Exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = { userAuth };
