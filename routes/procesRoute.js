const router = require("express").Router()
const Process = require("../models/procesModel")
const Product = require("../models/productModel")
const Employee = require("../models/employeeModel")
const Departament = require("../models/departamentModel")
router.get("/", async (req,res)=> {
    const procs = await Process.find({}).populate("product").populate("master").populate("detail").populate("departament")
    res.render("proces/index", {title:"Таблица процессов", procs})
})
router.get("/create", async (req,res)=> {
    const procs = await Process.find({}).populate("product").populate("master").populate("departament")
    const details = await Product.find({productType:"Деталь"})
    const products = await Product.find({productType:"Изделие"})
    const employees = await Employee.find({})
    res.render("proces/create", {title:"Добавить процесс", procs,details, products, employees})
})
router.post("/create", async (req,res)=> {
    let proc
    try {
        proc=await new Process({
            processDate: req.body.processDate,
            processName: req.body.processName,
            detail: req.body.detail,
            product: req.body.product,
            master: req.body.master,
            quantity: req.body.quantity,
            processPrice: req.body.processPrice,
        })
        const master = await Employee.findById(proc.master)
        proc.departament = await master.departament
        await proc.save()
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
    let proc
    try {
        proc=await Process.findById(req.params.id)
        // if(req.body.processDate !== "")
        proc.processDate = req.body.processDate
        proc.processName= req.body.processName
        proc.detail= req.body.detail
        proc.product= req.body.product
        proc.master= req.body.master
        proc.quantity= req.body.quantity
        proc.processPrice= req.body.processPrice
        const master = await Employee.findById(proc.master)
        proc.departament = await master.departament
        await proc.save()
        res.redirect("/process")
    } catch(err){
        console.log(err)
        res.redirect(proc.id + "/edit")
    }
})
// router.delete("/:id", async (req,res)=>{
//     let item
//     try {
//       item = await detail.findById(req.params.id)
//       await item.remove()
//       res.redirect(`/`) 
//     } catch(err) {
//         console.log(err)
//     }
// })

module.exports = router