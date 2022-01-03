const {Schema, model} = require("mongoose")
const storageSchema = new Schema({
    item: {
        _id:{type:Schema.Types.ObjectId, ref:"productModel"},
        name:String,
        articul:String,
        productType:String
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