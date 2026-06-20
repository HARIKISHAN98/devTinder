const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/adminAuth");

app.use('/admin', adminAuth);

app.get("/admin/getData", (req, res) => {
    console.log("Admin is Authorized to get data");
    res.send("Data send to admin");
});

app.get("/admin/deleteData", (req, res) => {
    console.log("Admin is Authorized to delete data");
    res.send("Data deleted from admin");
});
 
app.get("/user/login", (req, res) => {
    console.log("User is logged in successfully");
    res.send("User logged in successfully");
});

app.get("/user/getData", userAuth, (req, res) => {
    console.log("User is Authorized to get data");
    res.send("Data send to user");
});

app.get("/user/deleteData", userAuth, (req, res) => {
    console.log("User is Authorized to delete data");
    res.send("Data deleted from user");
}); 

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
