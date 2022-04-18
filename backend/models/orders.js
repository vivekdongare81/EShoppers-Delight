const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const eachInCartSchema = mongoose.Schema({
    product:{
        type:ObjectId,
    ref:"productCollect"
    },
    name:String,
    count:Number,
     price:Number
})

const eachInCartCollect = mongoose.model("eachInCartCollect",
eachInCartSchema);

const OrderSchema = new mongoose.Schema({
 
        products:[eachInCartSchema],
        totalAmount:Number,
        transactionId:{},
        address:String,
        updated:Date,
        user:{
            type:ObjectId,
            ref:"userCollect"
        },
        
    status: {
        type: String,
        default: "Order Recieved", 
        enum:["Order Recieved", "Processing", "Shipped" ,"Delivered","Cancelled"]
      },
      type:{
        type: String,
        default: "COD", 
        enum:["Net Banking", "COD"]
      }
    
}, {timestamps:true} ); 

const OrderCollect=mongoose.model("OrderCollect",
OrderSchema);
module.exports={eachInCartCollect,OrderCollect};