const httpStatus = require('http-status')
const Video=require('../model/video.model')
const ApiError = require('../utils/ApiError')

const getPossibleContentRatings=(contentRating)=>{
    const possibleRatings=['7+', '12+', '16+', '18+']
    if(contentRating=='Anyone'){
        return possibleRatings
    }
    const i=possibleRatings.indexOf(contentRating)
    const newRatings=possibleRatings.splice(i)
    return newRatings;
}
const searchVideos=async(title,genre,contentRating,sortBy)=>{
    const titleMatch={title:{$regex:title,$options:'i'}}
    let genreMatch={genre:{$in:genre}}
    if(genre=="All"){
        genreMatch=null
    }
   const contentRatingArray= getPossibleContentRatings(contentRating)
    let contentRatingMatch={contentRating:contentRatingArray}
    if(contentRating=='Anyone'){
        contentRatingMatch=null
    }
   
    let sortByMatch={releaseDate:-1}
    if(sortBy=='viewCount'){
        sortByMatch={viewCount:-1}
    }
    const result=await Video.find({...titleMatch,...genreMatch,...contentRatingMatch}).sort(sortByMatch)
    return result
}
const getById=async (videoId)=>{
    return await Video.findById(videoId)
}


const createVideos=async(video)=>{
    const result= await Video.create(video)
    return result
}


const patchVotes=async(videoId,vote,change)=>{
    const video=await Video.findById(videoId)
    if(video==null){
        throw new ApiError(httpStatus.BAD_REQUEST,"Video not in DB")
    }
    let voteType
    if(vote=='upVote'){
        voteType="upVotes"
    }
    else{
        voteType="downVotes"
    }
    if(change=='increase'){
        video.votes[voteType]+=1
    }
    else{
        video.votes[voteType]-=1
    }
    await video.save();
    return video;
}


const patchViews=async(videoId)=>{
    const video=await Video.findById(videoId)
    if(video==null){
        throw new ApiError(httpStatus.BAD_REQUEST,"Video not in DB")
    }
    video.viewCount+=1
    await video.save();
    return video
}


 module.exports={
    searchVideos,
    getById,
    createVideos,
    patchVotes,
    patchViews
 }
