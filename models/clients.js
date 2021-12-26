const {Schema, model} = require("mongoose")
const clientSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    buyDate: {
        type:Date,
        required:true
    },
    items: {
        type:String,
        required:true
    },
    summ: {
        type:Number,
        required:true
    }
})

module.exports = model("clientModel", clientSchema)