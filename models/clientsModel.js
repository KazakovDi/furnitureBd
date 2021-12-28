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
        ref:"productModel",
        type: Schema.Types.ObjectId
    },
    summ: {
        type:Number,
        required:true
    }
})

module.exports = model("clientModel", clientSchema)