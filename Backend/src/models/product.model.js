const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name : { type : String , required : true, unique : true },
    description : { type : String , required : true },
    category : { type : String , required : true, enum: ["Local", "Organic", "Exotic", "Seasonal"], default: "Local" },
    price : { type : Number , required : true, min: 0 },
    unit : { type : String , required : true, enum: ["kg", "piece", "dozen", "pack"]},
    stock : { type : Number , required : true, min: 0 },
    origin : { type : String , required : true },
    image : { type : String , required : true },
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
