const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
 name:{
     type:String,
     required:true,
     maxlength:50,
     trim:true 
 },
 lastName:{
    type:String,
    required:false,
    maxlength:50,
    trim:true 
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true
},
userInfo:{
    type:String,
    trim:true
},
password:{
    type:String,
    required:true
},
salt:String,
role:{
    type:Number,
    default:0
},
purchaces:{
    type:Array,
    default:[]
}
} , {timestamps:true} );

const UserCollect= mongoose.model("UserCollect",userSchema);
module.exports =UserCollect;