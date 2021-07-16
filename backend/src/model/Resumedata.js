const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/ResumeDB");
const Schema=mongoose.Schema;

const ResumeSchema=new Schema({
    ID:String,
    name:String,
    email:String,
    phonenumber:Number,
    dob:String,
    gender:String,
    address:String,
    photo:String,
    education:Array,
    job:String,
    jobname:String,
    jobyear:Number,
    jobdes:String,
    skills:Array,
    achievement:String,
    languages:Array
})
var Resumedata=mongoose.model("resumedata",ResumeSchema);

module.exports=Resumedata;