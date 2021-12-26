const router = require("express").Router()
const Producer = require("../models/producersModel")
router.get("/", async(req,res)=> {
    try {
        const producers = await Producer.find({})
        res.render("producers/index", {title:"Изготовители", producers})
    } catch(err) {console.log(err)}
})
router.get("/create", async(req,res)=> {
    try {
        res.render("producers/create", {title:"Добавить изготовителя"})
    } catch(err) {console.log(err)}
})
router.post("/create", async(req,res)=> {
    try {
        const producer = await new Producer({
            producerName: req.body.producerName,
            workshop: req.body.workshop,
            level: req.body.level,
            pasport: req.body.pasport
        }).save()
        res.redirect("/producers")
    } catch(err) {console.log(err)}
})
router.get("/:id/edit", async(req,res)=> {
    const producer = await Producer.findById(req.params.id)
    res.render("producers/edit", {title:"Изменить изготовителя", producer})
})
router.put("/:id", async(req,res)=> {
    let item
    try {
        item = await detail.findById(req.params.id)
        item.producerName = req.body.producerName
        item.workshop = req.body.workshop
        item.level = req.body.level
        item.pasport = req.body.pasport
        await item.save()
        res.redirect("/producers")
    } catch(err){console.log(err)}
})


module.exports = router