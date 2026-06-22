const express = require("express");
const connectDB = require("./config/database");
const User = require("./utils/User");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // creating a new instance of User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("Data added sucessfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user : " + err.message);
  }
});

// API Get User by email
app.get("/users", async (req,res) => {
  const emailID = req.body.email;
  console.log(emailID);
   try{
    const users = await User.find({email : emailID});
    if(users.length === 0){
      res.status(404).send("User not found");
    } else {
    res.send(users);
    }
   } catch(err){
      res.status(400).send("Something went Wrong!");
   }
})

//API Get User - findbyID
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
app.get('/feed',async (req,res) => {
    try{
      const users = await User.find({});
      res.send(users);
    } catch(err){
      res.status(404).send("User not found!");
    }
})

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
