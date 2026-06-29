const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/adminAuth");
const {
  ValidateAllowedEdit,
  validateProfileEditData,
  validatePasswords
} = require("../utils/validation");
const validate = require("validator");
const bcrypt = require("bcrypt");

//view profile API
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//edit profile API
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //validate IS Entered data allowed to edit
    const isEditAllowed = ValidateAllowedEdit(req);
    if (!isEditAllowed) {
      throw new Error("Invalid Edit data request");
    }
    //validate request Body
    validateProfileEditData(req);
    Object.keys(req.body).every((key) => (req.user[key] = req.body[key]));
    // await req.user.save();
    res.status(200).json({
      success: 200,
      message: `${req.user.firstName}, your profile has been Edit Successfully`,
      user: req.user,
    });
  } catch (err) {
    res.status(400).send("ERROR :- " + err.message);
  }
});

//forgot password API
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validatePasswords(req);
    const { oldPassword, newPassword } = req.body;
    const isPasswordValid = await req.user.ValidatePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error("Enter a Correct Old Password");
    }
    if (!validate.isStrongPassword(newPassword)) {
      throw new Error("Enter a Strong new Password");
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    req.user.password = newPasswordHash;
    await req.user.save();
    res.send("New Password added Successfully");
  } catch (err) {
    res.status(400).send("ERROR :- " + err.message);
  }
});

module.exports = profileRouter;
