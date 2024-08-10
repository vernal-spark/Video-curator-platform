const express=require('express')
const router=express.Router()
const videoRoute=require('./videos.routes')
router.use('/videos',videoRoute)
module.exports=router