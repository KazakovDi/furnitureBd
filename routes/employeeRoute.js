const router = require("express").Router()
const Employee = require("../models/employeeModel")
const Departament = require("../models/departamentModel")
router.get("/", async(req,res)=> {
    try {
        const employees = await Employee.find({}).populate("departament").exec()
        res.render("producers/index", {title:"Рабочие", employees})
    } catch(err) {console.log(err)}
})
router.get("/create", async(req,res)=> {
    try {
        const departaments = await Departament.find({})
      res.render("producers/create", {title:"Добавить рабочего", departaments})
    } catch(err) {console.log(err)}
})
router.post("/create", async(req,res)=> {
    try {
        await new Employee({
        employeeName: req.body.employeeName,
        departament: req.body.departament,
        position: req.body.position,
        pasport: req.body.pasport
        }).save()
        res.redirect("/employees")
    } catch(err) {console.log(err)}
})
router.get("/:id/edit", async(req,res)=> {
    const employee = await Employee.findById(req.params.id)
    const departaments = await Departament.find({})
    res.render("producers/edit", {title:"Изменить рабочего", employee, departaments})
})
router.put("/:id", async(req,res)=> {
    let item
    try {
        item = await Employee.findById(req.params.id)
        item.employeeName = req.body.employeeName
        item.position = req.body.position
        item.departament = req.body.departament
        item.pasport = req.body.pasport
        await item.save()
        res.redirect("/employees")
    } catch(err){console.log(err)}
})
router.delete("/:id", async (req,res)=>{
    let item
    try {
      item = await Employee.findById(req.params.id)
      await item.remove()
      res.redirect(`/employees`) 
    } catch(err) {
        console.log(err)
    }
})

module.exports = router