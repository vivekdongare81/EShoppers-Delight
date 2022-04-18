const UserCollect = require("../models/user")
const OrderCollect = require("../models/orders")

//Midlleware to Find User &  Attach to Req (Params) by id 
exports.getUserById = (req, res, next, id) => {
    UserCollect.findById(id).exec((err, user) => {
        if (err || !user) {
            res.json({ error: "User not found" })
        } else {
            req.profile = user;
            next()
        }
    })
}

// Presenting User Profile Attacted in Req (Params)
exports.getUserProfile = (req, res) => {
    //Hiding unnecessary details of user while presenting to Frontend
    req.profile.password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    UserCollect.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false }, (err, user) => {
            if (err) {
                return res.this.status(400).json({
                    error: "Can't Update User coz You are not Registered !"
                })
            }
            user.password = undefined;
            user.salt = undefined;
            res.json(user);
            console.log("update successful");
        })
}

exports.getOrder = (req, res) => {
    //find user in OrderCollection by params profile
    OrderCollect.find({ user: req.profile._id })
        .populate("UserCollect", "_id name")
        .exec((err, order) => {
            if (!order || err) {
                return res.status(400).json({
                    error: "Order not found"
                })
            }
            res.json(order)
        })
}


exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
      purchases.push({
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id
      });
    });
    //store Purchaces in UserCollect DB
    UserCollect.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { purchases: purchases } },
      { new: true },
      (err, purchases) => {
        if (err) {
          return res.status(400).json({
            error: "Unable to save purchase list"
          });
        }
        next();
      }
    );
  };
  