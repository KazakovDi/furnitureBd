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
        _id:{ref:"productModel", type:Schema.Types.ObjectId, required:true},
        name:{
            type:String,
            required:true
        }
    },
    product: {
        _id:{ref:"productModel", type:Schema.Types.ObjectId, required:true},
        name:{
            type:String,
            required:true
        }
    },
    master: {
        _id:{ref:"employeeModel", type:Schema.Types.ObjectId, required:true},
        name:{
            type:String,
            required:true
        }
    },
    departament: { 
        _id:{ref:"employeeModel", type:Schema.Types.ObjectId, requried:true},
        name: {
            type:String,
            requried:true
        }
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