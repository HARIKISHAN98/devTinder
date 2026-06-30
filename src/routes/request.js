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
      if (status === "interested") {
        message = `${req.user.firstName} is interested in ${toUser.firstName}`;
      } else {
        message = `${req.user.firstName} has ignored ${toUser.firstName}`;
      }
      res.send({ message, data });
    } catch (err) {
      res.status(400).send("ERROR :- " + err.message);
    }
  },
);

//post reviewConnectionRequest
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      //status is correct or not
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: status + " : Status is not allowed " });
      }

      //reqestId is correct or not
      const isRequestIdvalid = await mongoose.Types.ObjectId.isValid(requestId);
      if (!isRequestIdvalid) {
        return res.status(400).json({ message: "RequestId is not Valid" });
      }

      //reqestId present in DB
      const ConnectionRequest = await connectionRequest
        .findOne({
          _id: requestId,
          toUserId: loggedInUser._id,
          status: "interested",
        })
        .populate("fromUserId", "firstName");

      if (!ConnectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request not found" });
      }

      ConnectionRequest.status = status;

      const data = await ConnectionRequest.save();
      res.send({
        message: `${loggedInUser.firstName} is ${status} the ${ConnectionRequest.fromUserId.firstName} request`,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  },
);

module.exports = requestRouter;
