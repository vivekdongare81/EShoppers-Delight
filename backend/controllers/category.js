
const CategoryCollect = require("../models/category")

//Midlleware to Find Category & Attach to Req (Params) by id 
exports.getCategoryById = (req, res, next, id) => {
    CategoryCollect.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = category;
        next()
    })
}

//middleware to get single category 
exports.getCategory = (req, res) => {
    //category already featched using its id by last MW 
    res.json(req.category)
}

//creating category Only by Admin
exports.createCategory = (req, res) => {
    const categoryObj = new CategoryCollect(req.body)
    categoryObj.save((err, category) => {
        if (!category || err ) {
            console.log(req.body)
            console.log(err)
            return res.status(400).json({
                error: "Error in Creating Category .."
            })
        }
        res.json(category)
    });
}


//middleware to get All categories 
exports.getAllCategories = (req, res) => {
    CategoryCollect.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        res.json(categories)
    })
}

//middleware to update single category only by admin
exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Error while updating Category.."
            })
        }
        res.json(updatedCategory)
    })
}

//middleware to delete single category
exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, deletedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Error while Deleting Category.."
            })
        }
        res.json(`Category named- ${deletedCategory.name} deleted Successfully.`)
    })
}
