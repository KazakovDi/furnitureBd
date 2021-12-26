const {Schema, model} = require("mongoose")
const storageSchema = new Schema({
    item: {
        ref:"detailModel",
        type: Schema.Types.ObjectId
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