const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/ResumeDB");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    email: String,
    password: String,
    address: String,
    phonenumber: String
})
var Userdata=mongoose.model("userdata",UserSchema);

module.exports=Userdata;