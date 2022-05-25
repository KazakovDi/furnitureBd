const router = require("express").Router()
const Sale = require("../models/saleModel")
const Employee =  require("../models/employeeModel")
const Product = require("../models/productModel")
const Client = require("../models/clientsModel")
const Departament = require("../models/departamentModel")
const queryFunc = require("../public/scripts/queryFuncs")
router.get("/", async (req,res)=> {
    let query
    try {
        query = Sale.find()
        query = queryFunc(query, req.query.client, "client")
        query = queryFunc(query, req.query.afterDate, "Date", "gte")
        query = queryFunc(query, req.query.beforeDate, "Date", "lte")
        query = queryFunc(query, req.query.seller, "seller.name")
        query = queryFunc(query, req.query.departament, "departament.name")
        query = queryFunc(query, req.query.product, "item.name")
        query = queryFunc(query, req.query.quantityMore, "quantity", "gte")
        query = queryFunc(query, req.query.quantityLess, "quantity", "lte")
        query = queryFunc(query, req.query.summMore, "summ", "gte")
        query = queryFunc(query, req.query.summLess, "summ", "lte")
        query = query.sort(req.query.sort)
    } catch(err) { console.log(err)}
    const sales = await query.exec()
    const departaments = await Departament.find({})
    res.render("sales/index", {title:"Продажи", sales, searchOptions:req.query, departaments})
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
        const seller = await Employee.findById(req.body.seller)
        const product = await Product.findById(req.body.item)
        sale = await new Sale({
            client: req.body.client,
            Date: req.body.Date,
            seller: {
                _id:seller.id,
                name:seller.employeeName
            },
            item: {
                _id:product.id,
                name:product.productName
            },
            departament: {
                _id:seller.id,
                name:seller.departament.departamentName
            },
            quantity: req.body.quantity
        })
        client =  await new Client({
            saleId: sale.id,
            client:req.body.client,
            Date: req.body.Date,
            item: {
                _id:product.id,
                name:product.productName
            }
        })
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
    try {
        sale = await Sale.findById(req.params.id)
        const seller = await Employee.find(req.body.seller)
        const item = await Product.find(req.body.item)
        sale.client = req.body.client
        if(req.body.Date !== "")
            sale.Date = req.body.Date
        sale.seller.id = req.body.seller
        sale.seller.name = seller.employeeName
        sale.departament.id = seller.departament.id
        sale.departament.name = seller.departament.departamentName
        sale.item.id = req.body.item
        sale.item.name = item.productName
        sale.quantity = req.body.quantity
        sale.summ = req.body.quantity * item.productPrice
    } catch(err) {
        console.log(err)
    }
})
router.delete("/worker/:id", async(req,res)=> {
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