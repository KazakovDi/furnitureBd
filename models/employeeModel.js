const {Schema, model} = require("mongoose")
const employeeSchema = new Schema({
    employeeName: {
        type:String,
        required:true
    },
    position: {
        type:String,
        required:true
    }, 
    departament: {
        ref:"departamentModel",
        type:Schema.Types.ObjectId
    },
    pasport: {
        type:String,
        required:true,
        unique:true
    }
})

module.exports = model("employeeModel", employeeSchema)