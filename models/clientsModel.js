const {Schema, model} = require("mongoose")
const clientSchema = new Schema({
    saleId: {
        ref:"salesModel",
        type: Schema.Types.ObjectId,
        required:true
    },
    client: {
        type:String,
        required:true
    },
    Date: {
        type:Date,
        required:true
    },
    item: {
        _id:{ref:"productModel", type: Schema.Types.ObjectId},
        name: {
            type:String,
            required:true
        }
    },
    summ: {
        type:Number,
        required:true
    }
})

module.exports = model("clientModel", clientSchema)