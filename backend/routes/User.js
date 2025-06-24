const express=require("express")
const userController=require("../controllers/User")
const { verifyToken } = require('../middleware/VerifyToken')
const router=express.Router()

router
    .get("/:id",userController.getById)
    .patch("/:id",userController.updateById)
    .post('/change-password', verifyToken, userController.changePassword)

module.exports=router