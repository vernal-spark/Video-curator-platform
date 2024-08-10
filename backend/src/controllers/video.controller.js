const {searchVideos,getById,createVideos,patchVotes,patchViews}=require('../services/index')
const catchAsync=require('../utils/CatchAsync')
const getVideos=catchAsync(async(req,res)=>{
    const title=req.query.title?req.query.title:''
    const genre=req.query.genres?req.query.genres:["All"]
    const genres=genre.split(',')
    const contentRating=req.query.contentRating?req.query.contentRating:"All"
    const sortBy=req.query.sortBy?req.query.sortBy:"releaseDate"
    const result=await searchVideos(title,genres,contentRating,sortBy)
    res.status(200).json({videos:result})
})

const getVideoById=catchAsync(async(req,res)=>{
    const {videoId}=req.params
    const result=await getById(videoId)
    res.status(200).json(result)
})

const addVideos=catchAsync(async(req,res)=>{
    const video=req.body;
    const result=await createVideos(video)
    res.status(201).json(result)
})

const updateVotes=catchAsync(async(req,res)=>{
    const {videoId}=req.params
    const {vote,change}=req.body
    const result=await patchVotes(videoId,vote,change)
    res.status(204).json(result)
})

const updateViews=catchAsync(async(req,res)=>{
    const {videoId}=req.params
    const result=await patchViews(videoId)
    res.status(204).json(result)
})

module.exports={
    getVideoById,
    getVideos,
    addVideos,
    updateVotes,
    updateViews
}
