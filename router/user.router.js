const express = require('express')
const { Register, Login, Employeelist, createemploye, deleteemployee, updateemployee, viewemployee } = require('../controller/user.controller')
const auth = require('../helper/auth')



let router=express.Router()


router.post("/register",Register)
router.post("/login",Login)
router.post("/createemployee",createemploye)
router.get("/employeelist",Employeelist)
router.get("/viewemployee/:id",viewemployee)
router.put("/update/:id",updateemployee)
router.delete("/delete/:id",deleteemployee)



module.exports=router