const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
    if(err){
        //log your error
        res.status(500).send("Internal Server Error");  
    }
});

app.get("/getUserData", (req, res) => {
//    try{
    // Logic of DB call and get User Data
    throw new Error("hgshg");
    res.send("User data sent");
//    } catch (err){
    res.status(500).send("Some Error Occured Contact Support Team");
//    }
});

app.use("/", (err, req, res, next) => {
    if(err){
        //log your error
        res.status(500).send("Internal Server Error");  
    }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
