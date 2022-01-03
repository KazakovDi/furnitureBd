const router = require("express").Router()
const product = require("../models/productModel")
const queryFunc = require("../public/scripts/queryFuncs")

router.get("/", async(req,res)=> {
    try {
    let query = product.find()
    query = queryFunc(query, req.query.name, "productName")
    query = queryFunc(query, req.query.articul, "productArticul")
    query = queryFunc(query, req.query.productType, "productType")
    query = queryFunc(query, req.query.priceLess, "productPrice", "lte")
    query = queryFunc(query, req.query.priceMore, "productPrice", "gte")
    query = query.sort(req.query.sort)
    const details = await query.exec()
    res.render("details/index", {title: "Комплектующие", details, searchOptions:req.query})
    } catch(err) {console.log(err)}
    
})
router.get("/create", async(req,res)=> {
    res.render("details/create", {title: "Новое комплектующее"})
})
router.post("/create", async(req,res)=> {
    const newProduct = await new product({
        productName:req.body.detailName,
        productArticul:req.body.detailId,
        productType:req.body.productType,
        productPrice: req.body.productPrice,
        productDescription:req.body.detailDescription
    })
    await newProduct.save()
})
router.get("/detail/:id/edit", async(req,res)=> {
        const item =  await product.findById(req.params.id)
        res.render("details/edit", {title: "Изменение комплектующего", item}) 
})
router.put("/detail/:id", async(req,res)=> {
    let item
    try {
        item =  await product.findById(req.params.id)
        item.productName = req.body.detailName
        item.productDescription = req.body.detailDescription
        item.productType = req.body.productType
        item.productPrice = req.body.productPrice
        await item.save()
        res.redirect("/")
    } catch(err){
        console.log(err)
    }
})
router.delete("/:id", async (req,res)=>{
    let item
    try {
      item = await product.findById(req.params.id)
      await item.remove()
      res.redirect(`/`) 
    } catch(err) {
        console.log(err)
    }
})
module.exports = router