const productModel =  require('../models/product.model');
const { uploadImage } = require('../services/storage.services');

async function createProduct(req , res){

    try { 

        const { name, description, category, price, unit, stock, origin } = req.body;
        const image = req.file

        console.log("Product Data: ", { name, description, category, price, unit, stock, origin });


        if(!image){
            return res.status(400).json({
                message : "Image is required"
            })
        }

        const upload = await uploadImage(image.buffer.toString('base64'), name);

        const newProduct = await productModel.create({
            name : name,
            description : description,
            category : category,
            price : price,
            unit : unit,
            stock : stock,
            origin : origin,
            image : upload.url
        })
        
        return res.status(201).json({
            message : "Product uploaded successfully"
        })

    }catch(err){
        console.error("Create Product Error: ", err);
        return res.status(500).json({
            message : "Internal server error"
        })
    }

}

async function getAllProducts(req, res) {

    try{

        const products = await productModel.find();

        return res.status(200).json({
            message : "Products fetched successfully",
            products : products
        })

    } catch(err) {
        console.error("Get All Products Error: ", err);
        return res.status(500).json({
            message : "Internal server error"
        })
    }

}

module.exports = { createProduct , getAllProducts };