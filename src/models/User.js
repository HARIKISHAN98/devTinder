const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Password is not Strong : " + value);
        }
      }
    },
    age: {
      type: Number,
      min: 18,
      max: 99,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data in not valid : " + value);
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL : " + value);
            }
        }
    },
    about: {
      type: String,
      default: "I am default description",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJwt =  async function (params) {
  const user = this;
  const token = await jwt.sign({_id:user._id}, "DEV@TINDER$790", {expiresIn : "7d"});
  return token;
}

userSchema.methods.ValidatePassword = async function (passwordFromUser) {
  const user = this;
  const hashPassword = user.password;
  const isValidPassword = await bcrypt.compare(passwordFromUser, hashPassword);
  return isValidPassword;
}

module.exports = mongoose.model("User", userSchema);
