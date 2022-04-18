//require formidable(replacement for json method) to fetch and add Product Data in DB
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

//require Products Model
const ProductCollect = require("../models/products")

//Midlleware to Find Product &  Attach to Req (Params) by id 
exports.getProductById = (req, res, next, id) => {
    ProductCollect.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "Product not Found !!"
            })
        }
        //attaching fought product to req param
        req.product = product;
        next()
    })
}

// sending Fought Product by getProductById to Frontend
exports.getProduct = (req, res) => {
    res.json(req.product)
}

// Get all Products 
exports.getAllProducts = (req, res) => {
    let num = req.query.limit ? parseInt(req.query.limit) : 20;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    ProductCollect.find()
        // .select("-photo")
        .sort([[sortBy, -1]])
        .limit(num)
        .populate("category")
        .exec(function (err, all_products) {
            if (err) {
                res.status(400).json({
                    error: "Error while getting All Products"
                })
            } else {
                res.json(all_products)
            }
        });
}


//Midlleware to Create New Product 
exports.createNewProduct = (req, res) => {
    //using formidable to fetch and use Product data (includes Media)
    let form = new formidable.IncomingForm();
    form.keepExtention = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Error while Adding Image"
            })
        }
        //Validation of Fields using Vanilla JS instead of ...Express-Validator ... Module
        //destructre the fields
        const { name, description, price, category, stock } = fields
        console.log(fields)
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "All fields are Required !"
            })
        }
        //Validation on File ( 3 MB = 1024*1024*3 = ~3000000)
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Image File Size must be less than 3 MB"
                })
            }
            //Create Product using Fields & attaching photo using File by fs
            let product = new ProductCollect(fields)
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
            //Save Product into DB
            product.save((err, saved_product) => {
                if (err) {
                    return res.status(400).json({
                        error: "Error while Saving Product into DB"
                    })
                }
                res.json(saved_product)
            })

        }
    })

}

//Midlleware to Find Product &  Update it.
exports.updateProduct = (req, res) => {
    //using formidable to fetch and use Product data (includes Media)
    let form = new formidable.IncomingForm();
    form.keepExtention = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Error while Adding Image"
            })
        }

        //UPDATATION CODE - this will copy all data from fields to update_this_product
        let update_this_product = req.product;
        update_this_product = _.extend(update_this_product, fields)

        //Validation on File ( 3 MB = 1024*1024*3 = ~3000000)
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Image File Size must be less than 3 MB"
                })
            }

            update_this_product.photo.data = fs.readFileSync(file.photo.path)
            update_this_product.photo.contentType = file.photo.type
            //Save Product into DB
            update_this_product.save((err, updated_product) => {
                if (err) {
                    return res.status(400).json({
                        error: "Error while Updating Product into DB"
                    })
                }
                res.json(updated_product)
            })

        }
    })
}


// Middleware to Update Bulkly the Entries that gets Affected after making Order 
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
      return {
        updateOne: {
          filter: { _id: prod._id },
          update: { $inc: { stock: -prod.count, sold: +prod.count } }
        }
      };
    });
  
    Product.bulkWrite(myOperations, {}, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Bulk operation failed"
        });
      }
      next();
    });
  };

// Middleware to Fetch all Unique Categories while Creating Product to Give user a Optins to Choose
exports.getAllUniqueCategories = (req, res) => {
    ProductCollect.distinct("category", {}, (err, category) => {
      if (err) {
        return res.status(400).json({
          error: "NO category found"
        });
      }
      res.json(category);
    });
  };
  
//Middleware to Delete Product
exports.deleteProduct = (req, res) => {
    let delete_this_product = req.product;
    delete_this_product.remove((err, deleted_product) => {
        if (err) {
            res.status(400).json({
                error: "Error while Deleting Product"
            })
        }
        else {
            res.json({
                error: `Product Named - ${deleted_product.name} Deleted Successfully`
            })
        }
    })
}