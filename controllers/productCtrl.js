const multer = require("multer");
const Product = require("../model/productModel");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images");
    },
    filename: (req, file, cb) => {
      const formatName = req.body.name.replaceAll(" ", "-").toLowerCase();
      cb(null, formatName + ".jpg");
    },
});

const uploadImg = multer({ storage }).single("image");

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ _id: productId });

        if(!product) {
            return res.status(404).json("Product not found!");
        }

        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const createProduct = async (req, res) => {
    try {
        const newProduct = await new Product({...req.body, image: req.file.path});
        await newProduct.save();

        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.deleteOne({ _id: productId });
        res.status(200).json("Delete successfully!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const checkProduct = await Product.findOne({ _id: productId });

        if(!checkProduct){
            return res.status(404).json("Product not found!");
        }
        const newData = {...req.body};
        if(req.file){
            newData.image = req.file.path;
        }
        await Product.updateOne({ _id: productId }, {$set: newData});
        res.status(200).json("Update product successfully!");
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getAllProduct,
    uploadImg,
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct,
}
