const express = require("express");
const router = express.Router();

const { signoutCtr, signupCtr, signinCtr, isSignedIn } = require("../controllers/authentication");
const { check } = require("express-validator");

router.route("/signup")
  .post([
    check("name", "Your Name should have atleast 2 characters. ").isLength({ min: 2 }),
    check("email", "It must be email").isEmail(),
    check("password", "Password should be of min 5 characters.").isLength({ min: 5 })
  ], signupCtr);

router.route("/signin")
  .post([
    check("email", "You must enter proper email").isEmail(),
    check("password", "Password should be of min 5 characters.").isLength({ min: 5 })
  ], signinCtr);

router.route("/signout")
  .get(signoutCtr);


module.exports = router;