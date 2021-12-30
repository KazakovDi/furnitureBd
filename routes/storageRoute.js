const router = require("express").Router()
const storage = require("../models/storage")
const products = require("../models/productModel")
const queryFunc = require("../public/scripts/queryFuncs")
router.get("/", async (req,res)=> {
    let query
    try {
    query = storage.find().populate("item")
    // query = query.regex("item.productName", new RegExp(req.query.name, 'i'))
    // query = queryFunc(query, req.query.name, "item.productName")
    // query = queryFunc(query, req.query.articul, "productArticul")
    // query = queryFunc(query, req.query.productType, "productType")
    // query = queryFunc(query, req.query.priceLess, "productPrice", "lte")
    // query = queryFunc(query, req.query.priceMore, "productPrice", "gte")
    const storageItems = await query.exec()
    res.render("storage/index", {title:"Склад", storageItems, searchOptions:req.query})
    } catch(err) {console.log(err)}
    
})
router.get("/create", async (req,res)=> {
    const items = await products.find({})
    const storageItems = await storage.find({})
    res.render("storage/create", {title:"Добавить на склад", storageItems, items})
})
router.post("/create", async (req,res)=> {
    await new storage({
        item:req.body.item,
        quantity:req.body.quantity,
        importDate: new Date( req.body.date)
    }).save()
    res.redirect("/storage")
})
router.delete("/:id", async(req,res)=> {
    let item
    try {
        item = await storage.findById(req.params.id)
        await item.remove()
        res.redirect("/storage")
    } catch(err) {
        console.log(err)
    }
})
router.get("/:id/edit", async(req,res)=> {
    const storageItem = await storage.findById(req.params.id).populate("item").exec();
    const items = await products.find({})
    res.render("storage/edit", {title:"Изменить на складе", storageItem, items})
})
router.put("/:id", async(req,res)=> {
    let storageItem
    try {
        storageItem = await storage.findById(req.params.id)
        storageItem.quantity = req.body.quantity
        if(req.body.date !== "")
        storageItem.importDate = req.body.date
        await storageItem.save()
        res.redirect("/storage")
    } catch(err){
        console.log(err)
    }
})
module.exports = router