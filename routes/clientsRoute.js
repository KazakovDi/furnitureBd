const router = require("express").Router()
const Client = require("../models/clientsModel")
router.get("/", async (req,res)=> {
    const clients = await Client.find({}).populate("item")
    res.render("clients/index", {title:"Таблица клиентов", clients})
})
router.put("/:id/edit", async (req,res)=> {
    const clients = await Client.find({}).populate("item")
    res.render("clients/index", {title:"Таблица клиентов", clients})
})
router.delete("/:id", async (req,res)=> {
    const clients = await Client.find({}).populate("item")
    res.render("clients/index", {title:"Таблица клиентов", clients})
})
module.exports = router