const router = require("express").Router()
const storage = require("../models/storage")
const Product = require("../models/productModel")
const queryFunc = require("../public/scripts/queryFuncs")
router.get("/", async (req,res)=> {
    let query
    try {
        query = storage.find()
        query = queryFunc(query,req.query.name,"item.name")
        query = queryFunc(query,req.query.articul,"item.articul")
        query = queryFunc(query,req.query.productType,"item.productType")
        query = queryFunc(query, req.query.quantityLess, "quantity", "lte")
        query = queryFunc(query, req.query.quantityMore, "quantity", "gte")
        query = queryFunc(query, req.query.beforeDate, "importDate", "lte")
        query = queryFunc(query, req.query.afterDate, "importDate", "gte")
        query = query.sort(req.query.sort)
    const storageItems = await query.exec()
    const products = await Product.find({})
    res.render("storage/index", {title:"Склад", storageItems,products, searchOptions:req.query})
    } catch(err) {console.log(err)}
    
})
router.get("/create", async (req,res)=> {
    const items = await Product.find({})
    const storageItems = await storage.find({})
    res.render("storage/create", {title:"Добавить на склад", storageItems, items})
})
router.post("/create", async (req,res)=> {
    const product = await Product.findById(req.body.item)
    await new storage({
        item: {
            _id:req.body.item,
            name: product.productName,
            articul: product.productArticul,
            productType: product.productType
        },
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
    const items = await Product.find({})
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