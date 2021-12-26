const {Schema, model} = require("mongoose")
const procesSchema = new Schema({
    startDate: {
        type:Date,
        required:true
    }, 
    deadlineDate: {
        type:Date, 
        required:true
    },
    details: [{
        detail: {
            ref:"detailModel",
            type:Schema.Types.ObjectId
        }
    }],
    procesName: {
        type:String, 
        required:true
    },
    product: {
        type:String,
        required:true
    },
    masterName: {
        type:String,
        required:true
    },
    departament: {
        type:String,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    totalProcesPrice: {
        type:Number,
        required:true
    }
})



module.exports = model("procesModel", procesSchema)