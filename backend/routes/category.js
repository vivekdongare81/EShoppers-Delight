const express = require("express");
const router = express.Router();

//only Admin can create categories
const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory } = require("../controllers/category")
const { getUserById } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication")
// params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

//route to create new category by only admin 
router.post("/create_category/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)

//route to get category 
router.get("/category/:categoryId", getCategory)

//route to get All categories 
router.get("/all_categories", getAllCategories)

//route to create update category by only admin 
router.put("/update_category/:userId/:categoryId", isSignedIn, isAuthenticated, isAdmin, updateCategory)

module.exports = router;
