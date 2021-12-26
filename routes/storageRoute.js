const router = require("express").Router()
const storage = require("../models/storage")
const details = require("../models/detailModel")
router.get("/", async (req,res)=> {
    const storageItems = await storage.find({}).populate("item").exec()
    const items = await details.find({})
    // console.log(storageItems[0].item)
    res.render("storage/index", {title:"Склад",items, storageItems})
})


router.get("/create", async (req,res)=> {
    const items = await details.find({})
    // const storageItem = new storage({
    //     item:"61bcafb1f8950f3fe927748a",
    //     quantity: 2,
    //     importDate: Date.now()
    // })
    const storageItems = await storage.find({})
    // items.forEach(item => {
    //     console.log(item)
    // })
    console.log(storageItems)
    res.render("storage/create", {title:"Добавить на склад", storageItems, items})
})
router.post("/create", async (req,res)=> {
    await new storage({
        item:req.body.item,
        quantity:req.body.quantity,
        importDate: new Date( req.body.date)
    }).save()
    res.redirect("/")
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
    const storageItem = await storage.findById(req.params.id);
    const items = await details.find({})
    res.render("storage/edit", {title:"Изменить на складе", storageItem, items})
})
module.exports = router