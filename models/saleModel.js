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
        _id:{ref:"employeeModel", type:Schema.Types.ObjectId},
        name: {
            type:String,
            requried:true
        }
    },
    departament: { 
        _id:{ref:"employeeModel", type:Schema.Types.ObjectId},
        name: {
            type:String,
            requried:true
        }
    },
    item: {
        _id:{ref:"productModel", type:Schema.Types.ObjectId},
        name: {
            type:String,
            requried:true
        }
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