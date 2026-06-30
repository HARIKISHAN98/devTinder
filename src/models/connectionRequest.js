const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User",
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "User",
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect Status type",
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.index({fromUserId : 1, toUserId:1});

connectionRequestSchema.pre("save", async function (){
  const connectionRequest = this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection Request to yourself");
  }
})

module.exports = mongoose.model("connectionRequest", connectionRequestSchema);
