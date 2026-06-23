const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50
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
    },
     password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 99
    },
    gender: {
      type: String,
      validate(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("Gender data in not valid");
        }
      }
    },
    photoURL : {
        type:String,
        default:"https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
    },
    about: {
      type: String,
      default: "I am default description",
    },
    skills : {
        type : [String],
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
