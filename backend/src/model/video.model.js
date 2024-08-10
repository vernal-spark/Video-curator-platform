const mongoose=require('mongoose')
const validator=require('validator')
const videoSchema=mongoose.Schema({
    videoLink:{
        type:String,
        required:true,
        validate(value){
            if(!value.match(/youtube\.com\/embed\//) && !value.match(/player\.vimeo\.com\/video\//))
            throw new Error("\"videoLink\" is required")
        }
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    genre: {
        type: String,
        required: true,
        enum: ['Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All'],
    },
    contentRating:{
        type:String,
        required:true,
        enum:["Anyone", "7+", "12+", "16+", "18+"]
    },
    releaseDate:{
        type:Date,
        required:true,
    },
    previewImage:{
        type:String,
        required:true,
        trim:true,
        validate:value=>validator.isURL(value)
    },
    votes:{
        upVotes:{type:Number,default:0,min:0},
        downVotes:{type:Number,default:0,min:0}
    },
    viewCount:{
        type:Number,
        min:0,
        default:0
    }
})
const Video=mongoose.model('Video',videoSchema);

module.exports=Video
