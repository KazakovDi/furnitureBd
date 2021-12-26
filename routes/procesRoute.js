const router = require("express").Router()
const Proces = require("../models/procesModel")
const detail = require("../models/detailModel")
router.get("/", async (req,res)=> {
    const procs = await Proces.find({}).populate("details.detail")
    res.render("proces/index", {title:"Таблица процессов", procs})
})
router.get("/create", async (req,res)=> {
    const procs = await Proces.find({}).populate("details.detail")
    const items = await detail.find({})
    res.render("proces/create", {title:"Добавить процесс", procs, items})
})
router.post("/create", async (req,res)=> {
    const val = await req.body.listSize
    for(let i=0; i<val; i++) {
        console.log(i)
    }
    res.redirect("/create")
})


module.exports = router