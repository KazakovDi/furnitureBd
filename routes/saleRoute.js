const router = require("express").Router()
const Sale = require("../models/saleModel")
const Employee =  require("../models/employeeModel")
const Product = require("../models/productModel")
const Client = require("../models/clientsModel")
router.get("/", async (req,res)=> {
    try {
        const sales = await Sale.find({}).populate("seller").populate("departament").populate("item")
        res.render("sales/index", {title:"Продажи", sales})
    } catch(err) { console.log(err)}
    
})
router.get("/create", async (req,res)=> {
    try {
        const employees = await Employee.find({position:"Продавец"})
        const products = await Product.find({})
        res.render("sales/create", {title:"Добавить продажи", products, employees})
    } catch(err) { console.log(err)}

})
router.post("/create", async (req,res)=> {
    let sale
    let client
    try {
            sale = await new Sale({
            client: req.body.client,
            Date: req.body.Date,
            seller: req.body.seller,
            item: req.body.item,
            quantity: req.body.quantity
        })
        client =  await new Client({
            saleId: sale.id,
            client:req.body.client,
            Date: req.body.Date,
            item: req.body.item,
        })
        const seller = await Employee.findById(sale.seller)
        sale.departament = seller.departament
        const product = await Product.findById(sale.item)
        sale.summ = product.productPrice * sale.quantity
        client.summ = sale.summ
        await sale.save()
        await client.save()
        res.redirect("/sales")
    } catch(err) { console.log(err)}
    
})
router.get("/:id/edit", async(req,res)=> {
    const sale = await Sale.findById(req.params.id)
    const employees = await Employee.find({position:"Продавец"})
    const products = await Product.find({})
    res.render("sales/edit", {title:"Изменить продажу", sale, employees, products})
})
router.put("/:id", async(req,res)=> {
    let sale
    let cli
    try {
        sale = await Sale.findById(req.params.id)
        sale.client = req.body.client
        if(req.body.Date !== "")
            sale.Date = req.body.Date
        sale.seller = req.body.seller
        sale.item = req.body.item
        sale.quantity = req.body.quantity
        const seller = await Employee.findById(sale.seller)
        sale.departament = seller.departament
        const product = await Product.findById(sale.item)
        sale.summ = product.productPrice * sale.quantity
        await sale.save()
        cli = await Client.findOne({saleId:req.params.id})
        await cli.overwrite({
            client:sale.client,
            saleId:req.params.id,
            Date:sale.Date,
            item:sale.item,
            summ:sale.summ
        })
        await cli.save()
    } catch(err) {
        console.log(err)
    }
})
router.delete("/:id", async(req,res)=> {
    let sale
    let client
    try {
        sale = await Sale.findById(req.params.id)
        client = await Client.findOne({saleId:req.params.id})
        await sale.remove()
        await client.remove()
        res.redirect("/sales")
    } catch(err) {
        console.log(err)
    }
})
module.exports = router