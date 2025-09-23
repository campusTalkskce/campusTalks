const express=require('express')

const router=express.Router()

const data=require('../controller/datacontroller')

router.post("/signup",data.signup)
router.post("/login",data.login)

module.exports=router