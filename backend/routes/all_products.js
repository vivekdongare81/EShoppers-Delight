const express = require("express");
const router = express.Router();

//Add Required Middlewares
const {getProductById,getProduct,getAllProducts,createNewProduct, updateProduct , deleteProduct} = require("../controllers/all_products")
const {getCategoryById} = require("../controllers/category")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication")
const {getUserById} = require("../controllers/user")

//required params
router.param("productId", getProductById)
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

//create product by only admins
router.post("/create_product/:userId",isSignedIn,isAdmin,createNewProduct)

//get particular product by any user
router.get("/product/:productId",getProduct)

//get all products by any user
router.get("/all_products",getAllProducts)

//update existing product only by admins
router.put("/update_product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

//delete products only by admins
router.delete("/delete_product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)


//Testing ---- Secret Page is only Accesable if we are Logged in 
router.get("/secretPage/:userId", isSignedIn, (req, res) => {
    res.send("You are In")
  })

module.exports = router;