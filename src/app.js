const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const { trusted } = require("mongoose");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    //Validate the request body
    validateSignUpData(req);
    //convert password into the hash
    const hashpassword = await bcrypt.hash(password, 10);
    console.log(hashpassword);
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

// API Get User by email - find()
app.get("/users", async (req, res) => {
  const emailID = req.body.email;
  console.log(emailID);
  try {
    const users = await User.find({ email: emailID });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went Wrong!");
  }
});

//API Get User - findById()
// app.get("/user/:id", async (req, res) => {
//   const id = req.params.id;
//   try{
//     const user = await User.findById(id);
//     if(!user){
//       res.status(404).send("user not found!");
//     } else {
//       res.send(user);
//     }
//   } catch(err){
//     res.status(400).send("Something went wrong!");
//   }
// })

// API - feed API - Get /feed - get all the users from the database

//API - feed - get all the users - find()
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("User not found!");
  }
});

//APi - delete the user - findByIdAndDelete()
app.delete("/deleteUser", async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted Sucessfully!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

//API - update the user (via _id) - findByIdAndUpdate()
app.patch("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params?.id;
    const ALLOWED_UPDATES = ["photoURL", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("update not Allowed");
    }

    if (req.body?.skills.length > 10) {
      throw new Error("Skills should not be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Update Failed : " + err.message);
  }
});

//API - update the user (via email) - findOneAndUpdate()
// app.patch("/updateUser", async (req, res) => {
//   const email = req.body.email;
//   try{
//     const user = await User.findOneAndUpdate({email : email},req.body,{returnDocument:'after'});
//     console.log(user);
//     if(!user){
//       res.status(404).send("User not found.");
//     } else {
//       res.send("User updated Sucessfully!");
//     }
//   } catch(err){
//     res.status(400).send("Something went wrong!!");
//   }
// })

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
