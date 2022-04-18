const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true })

const categoryCollect = mongoose.model("categoryCollect", categorySchema);

module.exports = categoryCollect;