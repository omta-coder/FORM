const mongoose = require("mongoose");
mongoose
    .connect("mongodb://127.0.0.1:27017/login")
    .then(() => console.log("db connected!"))
    .catch((err) => console.log(err.message));

const userModel = new mongoose.Schema({
    image:String,
    name:String,
    password: String,
    description:String,
});
module.exports = mongoose.model("user", userModel);
