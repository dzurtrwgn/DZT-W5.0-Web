const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    brand: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);