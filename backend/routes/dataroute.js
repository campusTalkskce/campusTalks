const express=require('express')

const router=express.Router()
const upload=require("../middleware/upload")

const data=require('../controller/datacontroller')
router.post("/savedata",upload.single("image"),data.savepost)
router.get("/getpost",data.getpost)
router.post("/signup",data.signup)
router.post("/login",data.login)
router.post("/postevent",data.postevents)
router.get("/getevent",data.getevents)


module.exports=router