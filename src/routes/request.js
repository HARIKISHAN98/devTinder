const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/adminAuth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

//post sendConnectionRequest
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
      const status = req.params.status;
      console.log(toUserId + " " + fromUserId + " " + status);

      //check Allowed Status
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type : " + status });
      }

      //check toUserId is valid or not
      const isValidtoUserId = mongoose.Types.ObjectId.isValid(toUserId);
      if (!isValidtoUserId) {
        return res.status(400).json({
          message: "Invalid User ID",
        });
      }

      //check the toUserId is present in DB or valid UserId
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      //I cannot send request to myself
      // if (fromUserId.equals(toUserId)) {
      //   throw new Error("Can not send Request to Yourself");
      // }

      //Request should not send again and again, then reciver can not send me request again
      const existingConnectionRequest = await connectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      console.log("existingConnectionRequest : " + existingConnectionRequest);
      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection Request Already Exist!",
        });
      }

      const ConnectionRequest = await new connectionRequest({
        toUserId,
        fromUserId,
        status,
      });
      const data = await ConnectionRequest.save();
      let message;
      if(status === "interested"){
        message = `${req.user.firstName} is interested in ${toUser.firstName}`;
      } else {
        message = `${req.user.firstName} has ignored ${toUser.firstName}`;
      }
      res.send({message, data});
    } catch (err) {
      res.status(400).send("ERROR :- " + err.message);
    }
  },
);

module.exports = requestRouter;
