const express = require("express");
const { userAuth } = require("../middlewares/adminAuth");
const connectionRequest = require("../models/connectionRequest");
const { connections } = require("mongoose");
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoURL about skills";
const User = require("../models/User");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const ConnectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName", "photoURL", "about", "skills"]);

    res.json({
      message: "Data fetch Successfully",
      data: ConnectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROE :- " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const Connections = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = Connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.send({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try{
    // User should see on the user card exclude
    // 0. his own card
    // 1. his connections 
    // 2. ignored people
    // 3. already send the connection request

    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connections = await connectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id},
        { fromUserId: loggedInUser._id},
      ],
    }).select("toUserId fromUserId").populate("toUserId fromUserId", "_id firstName");

    const hideUsersFromFeed = new Set();

    connections.forEach((req => {
      hideUsersFromFeed.add(req.toUserId._id.toString());
      hideUsersFromFeed.add(req.fromUserId._id.toString());
    }))

    const feed = await User.find({
        _id : {
          $nin: Array.from(hideUsersFromFeed),
          $ne: loggedInUser._id
        }
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.send({ data: feed });
  } catch(err){
    res.status(400).send({ message: err.message });
  }
})

module.exports = userRouter;
