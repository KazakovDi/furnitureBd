const {Schema, model} = require("mongoose")
const detailSchema = new Schema({
    productName: {
        type:String,
        required:true
    }, 
    productArticul: {
        type:String,
        required:true,
        unique:true
    },
    productDescription: {
        type:String,
        default:"Нет данных",
        required:true
    }
})

module.exports = model("detailModel", detailSchema)