const multer=require("multer")
const path = require("path")

const storage =multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{

        const extension=path.extname(file.originalname)
        const newname=`${Date.now()}${extension}`
        cb(null,newname)

    }


})

const upload =multer({storage})

module.exports=upload