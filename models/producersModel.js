const {Schema, model} = require("mongoose")
const producerSchema = new Schema({
    producerName: {
        type:String,
        required:true
    },
    workshop: {
        type:String,
        required:true
    }, 
    level: {
        type:Number,
        required:true
    },
    pasport: {
        type:String,
        required:true,
        unique:true
    }
})




module.exports = model("producerModel", producerSchema)