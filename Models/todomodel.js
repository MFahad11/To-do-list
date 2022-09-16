import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    tasks:{type:Array,required:false},
    status:{type:Array,required:false}
})
// MODEL
const userModel=mongoose.model("USER",userSchema)
export default userModel