const mongoose = require("mongoose");

const connectDB = async () => {
 await mongoose.connect('mongodb+srv://mern-app:o96ebfMdMrfyBBac@cluster0.whxthpg.mongodb.net/devTinder');
}



module.exports = connectDB;
