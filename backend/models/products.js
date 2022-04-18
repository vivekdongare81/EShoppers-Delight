const mongoose = require("mongoose");
const {ObjectId} =mongoose.Schema;  //  to Access or Import Objectid from other Collections
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength:50
  },
  description:{
      type:String,
      required:true,
      maxlength:2000
  },
  price:{
      type:Number,
      required:true
  },
  inStock:{
      type:Number
  },
  sold:{
      type:Number,
       default:0
  },
  photo:{
      data:Buffer,
      contentType:String
  },
  category:{
      type:ObjectId,
      ref:"categoryCollect", // using ObjectId from UserCollect Collection to link Relationship
      required:true
  }

}, {timestamps:true});

const ProductCollect=mongoose.model("ProductCollect",productSchema);
module.exports=ProductCollect;