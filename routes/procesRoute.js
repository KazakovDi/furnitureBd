const router = require("express").Router()
const Process = require("../models/procesModel")
const Product = require("../models/productModel")
const Employee = require("../models/employeeModel")
const Departament = require("../models/departamentModel")
const queryFunc = require("../public/scripts/queryFuncs")
router.get("/", async (req,res)=> {
    let query = Process.find()
    query = queryFunc(query, req.query.beforeDate, "processDate", "lte")
    query = queryFunc(query, req.query.afterDate, "processDate", "gte")
    query = queryFunc(query, req.query.detail, "detail.name")
    query = queryFunc(query, req.query.product, "product.name")
    query = queryFunc(query, req.query.processName, "processName")
    query = queryFunc(query, req.query.master, "master.name")
    query = queryFunc(query, req.query.departament, "departament.name")
    query = queryFunc(query, req.query.quantityLess, "quantity", "lte")
    query = queryFunc(query, req.query.quantityMore, "quantity", "gte")
    query = queryFunc(query, req.query.priceLess, "processPrice", "lte")
    query = queryFunc(query, req.query.priceMore, "processPrice", "gte")
    const departaments = await Departament.find({})
    const procs = await query.exec()
    res.render("proces/index", {title:"Таблица процессов", procs,departaments,  searchOptions:req.query})
})
router.get("/create", async (req,res)=> {
    const procs = await Process.find({})
    const details = await Product.find({productType:"Деталь"})
    const products = await Product.find({productType:"Изделие"})
    const employees = await Employee.find({})
    
    res.render("proces/create", {title:"Добавить процесс", procs,details, products, employees})
})
router.post("/create", async (req,res)=> {
    let process
    const detail = await Product.findById(req.body.detail)
    const product = await Product.findById(req.body.product)
    const employee = await Employee.findById(req.body.master)
    try {
        process = await new Process({
            processDate: req.body.processDate,
            processName: req.body.processName,
            detail: {
                _id:req.body.detail,
                name:detail.productName
            },
            product: {
                _id:req.body.product,
                name:product.productName
            },
            departament: {
                _id:req.body.master,
                name:employee.departament.departamentName
            },
            master: {
                _id:req.body.master,
                name:employee.employeeName
            },
            quantity: req.body.quantity,
            processPrice: req.body.processPrice,
        })
        await process.save()
        res.redirect("/process")
    } catch(err) {res.redirect("/process/create"); console.log(err)}
})
router.get("/:id/edit", async(req,res)=> {
    try {
        const process = await Process.findById(req.params.id)
        const details = await Product.find({productType:"Деталь"})
        const products = await Product.find({productType:"Изделие"})
        const employees = await Employee.find({})
        res.render("proces/edit", {title:"Изменить процесс", process, details, products, employees })
    } catch(err) {
        res.redirect("/process")
        console.log(err)
    }
})
router.put("/:id", async(req,res)=> {
    let process
    try {
        const detail = await Product.findById(req.body.detail)
        const product = await Product.findById(req.body.product)
        const master = await Employee.findById(process.master.id)
        process=await Process.findById(req.params.id)
        process.processDate = req.body.processDate
        process.processName= req.body.processName
        process.detail.name= detail.productName
        process.product.name= product.productName
        process.master.id= req.body.master
        process.quantity= req.body.quantity
        process.processPrice = req.body.processPrice
        process.master.name = master.employeeName
        process.departament.id = master.departament.id
        process.departament.name = master.departament.name
        await process.save()
        res.redirect("/process")
    } catch(err){
        console.log(err)
        res.redirect(process.id + "/edit")
    }
})
router.delete("/:id", async (req,res)=>{
    let item
    try {
      item = await Process.findById(req.params.id)
      await item.remove()
      res.redirect(`/process`) 
    } catch(err) {
        console.log(err)
    }
})

module.exports = router