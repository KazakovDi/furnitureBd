const {Schema, model} = require("mongoose")
const productSchema = new Schema({
    productName: {
        type:String,
        required:true
    }, 
    productArticul: {
        type:String,
        required:true,
        unique:true
    },
    productType: {
        type:String,
        required:true
    },
    productDescription: {
        type:String,
        default:"Нет данных",
        required:true
    }
})

module.exports = model("productModel", productSchema)