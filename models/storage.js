const {Schema, model} = require("mongoose")
const storageSchema = new Schema({
    item: {
        ref:"productModel",
        type: Schema.Types.ObjectId,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    importDate: {
        type:Date,
        required:true
    }
})




module.exports = model("storageModel", storageSchema)