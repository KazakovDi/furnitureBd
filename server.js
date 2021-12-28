const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
const methodOverride = require("method-override")
const Departament =  require("./models/departamentModel")
// new Departament({
//     departamentName:"Мастерская 1"
// }).save()
// new Departament({
//     departamentName:"Отдел продаж 1"
// }).save()
const PORT = process.env.PORT || 3000
const app = express()
app.use(expressLayouts)
app.set("layout", "./layouts/layout")
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"))
app.use("/css", express.static(__dirname + "public/css"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))



const clientsRoute =  require("./routes/clientsRoute")
const productionRoute = require("./routes/production")
const storageRoute = require("./routes/storageRoute")
const employeeRoute = require("./routes/employeeRoute")
const procesRoute = require("./routes/procesRoute")
app.use("/", productionRoute)
app.use("/clients", clientsRoute)
app.use("/storage", storageRoute)
app.use("/employees", employeeRoute)
app.use("/process", procesRoute)
async function start() {
    try {
        await mongoose.connect("mongodb+srv://User:g1n1rAl-s1rv1lat@cluster0.gjm6c.mongodb.net/funiture",
        {
            useNewUrlParser:true
        })
        app.listen(PORT, ()=> {
            console.log("Сервер пашет")
        })
    } catch (err) {console.log(err)}
}

start()
