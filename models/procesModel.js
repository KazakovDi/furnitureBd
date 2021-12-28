const {Schema, model} = require("mongoose")
const processSchema = new Schema({
    processDate: {
        type:Date, 
        required:true
    },
    processName: {
        type:String, 
        required:true
    },
    detail: {
        ref:"productModel",
        type:Schema.Types.ObjectId
    },
    product: {
        ref:"productModel",
        type:Schema.Types.ObjectId
    },
    master: {
        ref:"employeeModel",
        type:Schema.Types.ObjectId
    },
    departament: {
        ref:"departamentModel",
        type:Schema.Types.ObjectId
    },
    quantity: {
        type:Number,
        required:true
    },
    processPrice: {
        type:Number,
        required:true
    }
})



module.exports = model("processModel", processSchema)