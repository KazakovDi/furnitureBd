const router = require("express").Router()
const detail = require("../models/detailModel")

router.get("/", async(req,res)=> {
    const details = await detail.find({})
    res.render("details/index", {title: "Комплектующие", details})
})
router.get("/createDetail", async(req,res)=> {
    res.render("details/createDetail", {title: "Новое комплектующее"})
})
router.post("/createDetail", async(req,res)=> {
    const newDetail = await new detail({
        productName:req.body.detailName,
        productArticul:req.body.detailId,
        productDescription:req.body.detailDescription
    })
    await newDetail.save()
})
router.get("/detail/:id/edit", async(req,res)=> {
        const item =  await detail.findById(req.params.id)
        res.render("details/edit", {title: "Изменение комплектующего", item}) 
})
router.put("/detail/:id", async(req,res)=> {
    let item
    try {
        item =  await detail.findById(req.params.id)
        item.productName = req.body.detailName
        item.productDescription = req.body.detailDescription
        await item.save()
        res.redirect("/")
    } catch(err){
        console.log(err)
    }
})
router.delete("/:id", async (req,res)=>{
    let item
    try {
      item = await detail.findById(req.params.id)
      await item.remove()
      res.redirect(`/`) 
    } catch(err) {
        console.log(err)
    }
})
module.exports = router