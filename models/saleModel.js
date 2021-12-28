const {Schema, model} = require("mongoose")
const salesSchema = new Schema({
    client: {
        ref:"clientModel",
        type:Schema.Types.ObjectId
    },
    Date: {
        ref:"clientModel",
        type:Schema.Types.ObjectId
    },
    seller: {
        type:String,
        required:true
    },
    departament: {
        ref:"departamentModel",
        type:Schema.Types.ObjectId
    },
    item: {
        ref:"detailModel",
        type:Schema.Types.ObjectId
    },
    price: {
        type:Number, 
        required:true
    },
    quantity: {
        type:Number, 
        required:true
    },
    discount: {
        type:Number,
        required:true
    }
})
module.exports = model("salesModel", salesSchema)