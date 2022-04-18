//Importing Models & requiring dependencies
require("dotenv")
const UserCollect = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const jwtChecker = require("express-jwt")

//.....Unprotected Routes............
exports.signupCtr = (req, res) => {
    //Validator for Format of Input Recived
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    //Adding User in DataBase & Encrypting Password 
    const userObj = new UserCollect(req.body);
    bcrypt.hash(userObj.password, saltRounds, function (err, hash) {
        userObj.password = hash;
        userObj.save((err, user) => {
            if (err || !user) {
                res.json({ error: "Email already in Use !" })
            } else {
                res.json(user)
            }
        });
    });
};

exports.signinCtr = (req, res) => {
    const { email, password } = req.body;
    //Validator for Format of Input Recived
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    //Checking User in DataBase      
    UserCollect.findOne({ email }, (error, user) => {
        if (!user || error) {
            return res.status(400).json({
                error: "User not Registered !!",
            });

        }
        // if Email matched Check Hashed Password with Inputs
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                //creating  TOEKN
                const token = jwt.sign({ id: user._id }, process.env.SECRET);
                //put token in COOKIE
                res.cookie("mycookiewithtoken", token, { expire: new Date() + 5555 })
                //.....sending responce to FRONTEND......
                const { _id, name, email, role } = user;
                res.json({ token, user: { _id, name, email, role } });
                console.log("signinCtr")
            } else {
                res.json({
                    error: "Email and Password not Matched !!",
                });
            }
        });
    });
};

exports.signoutCtr = (req, res) => {
    res.clearCookie("mycookiewithtoken")
    res.json({
        message: "User got Signout!"
    })
};

//.......Middleware to Protect Routes........
exports.isSignedIn = jwtChecker({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})

//.....Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
    //auth is from jwtChecker it stores signedin user's ID
    if (!(req.profile && req.auth && req.profile._id == req.auth.id)) {

        return res.status(403).json({
            error: "Access Denied !!"
        })
    }
    console.log("isAuth")
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        res.status(403).json({
            error: "Access Denied, you are not Admin !!"
        })
    }
    console.log("isAdmin")
    next();
}
