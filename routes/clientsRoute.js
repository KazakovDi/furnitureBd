const router = require("express").Router()
router.get("/", async (req,res)=> {
    res.render("clients/index", {title:"Таблица клиентов"})
})
module.exports = router