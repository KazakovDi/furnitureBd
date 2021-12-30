const {Schema, model} = require("mongoose")
const salesSchema = new Schema({
    client: {
        type:String, 
        required:true
    },
    Date: {
        type:Date, 
        default:Date.now(),
        required:true
    },
    seller: {
        ref:"employeeModel",
        type:Schema.Types.ObjectId
    },
    departament: {
        ref:"departamentModel",
        type:Schema.Types.ObjectId
    },
    item: {
        ref:"productModel",
        type:Schema.Types.ObjectId
    },
    summ: {
        type:Number, 
        required:true
    },
    quantity: {
        type:Number, 
        required:true
    }
})
module.exports = model("salesModel", salesSchema)