const {Schema, model} = require("mongoose")
const departamentSchema = new Schema({
    departamentName: {
        type:String,
        required:true
    },
})


module.exports = model("departamentModel", departamentSchema)