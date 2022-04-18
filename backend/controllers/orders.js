const UserCollect = require("../models/user")
const { eachInCartCollect, OrderCollect } = require("../models/orders")
const router = require("../routes/orders")

// Get Order Details in params by Id
exports.getOrderById = (req, res, next, id) => {
  OrderCollect.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Orders not Found "
        })
      } else {
        req.order = order;
        next();
      }
    })
}

//Middleware to Create Order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const new_order = new OrderCollect(req.body.order)
  new_order.save((err, saved_order) => {
    if (err) { 
      return res.status(400).json({
        error: "Failed to Make Order :( Please Try Again"
      })
    }
     console.log("order saved")
     return res
     .status(200)
     .json(saved_order);
  })
}


//Middleware to get order by specific authenticated user

//Middleware to get All Orders of User
exports.getAllOrders = (req, res) => {
  console.log("1");
  // OrderCollect.find()
  
  //   .exec((err, order) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: "No orders found in DB"
  //       });
  //     } 
  //     res.json(order);
  //   });
  if(req.profile.role===1){
    console.log("2");
    OrderCollect.find()
    .exec((err, order) => {
      console.log("3");
      if (err) {   console.log("4");
        return res.status(400).json({
          error: "No orders found in DB"
        });
      } 
      console.log("4");
      return res.json(order);
    });
  }else{
    OrderCollect.find({user:req.profile._id })
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB"
        });
      } 
     return  res.json(order);
    });
  
  }
};

//Set Order status by Admin
exports.setOrderStatus = (req, res) => {
  OrderCollect.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status"
        });
      }
      res.json(order);
    }
  );
}

//get Order Status by Specific Authenticated User
exports.getOrderStatus = (req, res) => {
  res.json(OrderCollect.schema.path("status").enumValues);
}



