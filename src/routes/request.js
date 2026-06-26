const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/adminAuth");

//post sendConnectionRequest
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sended the connection Request");
  } catch (err) {
    res.status(400).send("ERROR :- " + err.message);
  }
});

module.exports = requestRouter;
