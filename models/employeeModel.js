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
        _id:{ref:"departamentModel", type:Schema.Types.ObjectId},
        departamentName: {
            type:String,
            required:true
        }
    },
    pasport: {
        type:String,
        required:true,
        unique:true
    }
})

module.exports = model("employeeModel", employeeSchema)