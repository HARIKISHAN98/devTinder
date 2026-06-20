const express = require("express");

const app = express();

app.use("/users", [
  (req, res, next) => {
    console.log("1st Route handler");
    next();
  },
  [
    (req, res, next) => {
      console.log("2nd Route handler");
      next();
    },
    (req, res, next) => {
      console.log("3rd Route handler");
      next();
    },
  ],
  (req, res, next) => {
    console.log("4th Route handler");
    next();
    res.send("Hello from the users route");
  },
]);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
