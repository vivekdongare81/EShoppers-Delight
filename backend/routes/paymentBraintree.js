const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/authentication");
const { getToken,sendNonce } = require("../controllers/paymentBraintree");
const {getUserById} = require("../controllers/user");

router.param("userId", getUserById)

// Step 1 - Get Token from Server 
router.get("/payment/gettoken/:userId", isSignedIn , isAuthenticated , getToken );
// Step 2 - Send Nonce to Server
router.post("/payment/sendnonce/:userId", isSignedIn, isAuthenticated , sendNonce);

module.exports = router;