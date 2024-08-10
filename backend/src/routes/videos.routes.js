const express=require('express')
const router=express.Router();
const videoController=require('../controllers/index.js')
const validate=require('../middlewares/validate')
const videoValidations=require('../validations/index')

router.get('/',validate(videoValidations.getBySearchQuery),videoController.getVideos)
router.get('/:videoId',validate(videoValidations.mongoId),videoController.getVideoById)
router.post('/',validate(videoValidations.saveVideo),videoController.addVideos)
router.patch('/:videoId/votes',validate(videoValidations.mongoId),validate(videoValidations.votes),videoController.updateVotes)
router.patch('/:videoId/views',validate(videoValidations.mongoId),videoController.updateViews)


module.exports=router