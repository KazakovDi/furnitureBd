const router = require("express").Router()
const Client = require("../models/clientsModel")
const queryFunc = require("../public/scripts/queryFuncs")
router.get("/", async (req,res)=> {
    let query
    try {
        query = Client.find({})
        query = queryFunc(query, req.query.name, "client")
        query = queryFunc(query, req.query.dateAfter, "Date", "gte")
        query = queryFunc(query, req.query.dateBefore, "Date", "lte")
        query = queryFunc(query, req.query.item, "item.name")
        query = queryFunc(query, req.query.summMore, "summ", "gte")
        query = queryFunc(query, req.query.summLess, "summ", "lte")
        query = query.sort(req.query.sort)
    } catch(err) {
        
    }
    const clients = await query.exec()
    res.render("clients/index", {title:"Таблица клиентов", clients, searchOptions:req.query})
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