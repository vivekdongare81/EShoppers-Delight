const express = require("express");
const router = express.Router();

const {getUserById,getUserProfile,updateUser,getOrder} = require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication")

router.param("userId", getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUserProfile)

router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)

router.get("/order/user/:userId",isSignedIn,isAuthenticated,getOrder)

module.exports = router;