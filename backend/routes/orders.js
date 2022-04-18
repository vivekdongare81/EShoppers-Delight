const express = require("express");
const router = express.Router();

//Gettings Required Middlewares
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { updateStock } = require("../controllers/all_products")

const { getOrderById, createOrder, getOrder, getAllOrders, getOrderStatus, setOrderStatus } = require("../controllers/orders")

//params for Order and User ids
router.param("orderId", getOrderById)
router.param("userId", getUserById)

//Creating Order and Pushing Order data into User's Profile
router.post("/create_order/:userId", isSignedIn, isAuthenticated, createOrder, pushOrderInPurchaseList, updateStock)
 
// //Get Order by Authenticated User
// router.get("/get_order/:orderId/:userId",isSignedIn,isAuthenticated,isAdmin,getOrder)

//Get All Orders ny Admin
router.get("/get_all_orders/:userId", isSignedIn, isAuthenticated, getAllOrders)

//Getting Order Status by Authenticated user & Admin
router.get("/get_order_status/:userId", isSignedIn, isAuthenticated, getOrderStatus)

//Setting Order Status by Admin 
router.put("/set_order_status/:userId", isSignedIn, isAuthenticated, isAdmin, setOrderStatus)

module.exports = router;