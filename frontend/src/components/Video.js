import { Box ,Stack,Typography,Button,CircularProgress} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import {useEffect, useState} from 'react'
import "./Video.css";
import { useSnackbar } from "notistack";
import {config} from '../App'

const Video = ({video,upVote,downVote,setUpVote,setDownVote}) => {
  const {enqueSnackbar}=useSnackbar()
  const [isLoading1,setIsLoading1]=useState(false)
  const [isLoading2,setIsLoading2]=useState(false)
    const upvote={
        color:'white',
        borderRadius:'10px'
      }
      const downvote={
        color:'grey',
        background:'#202020',
        borderRadius:'10px'
      }

      const handleUpVote=async()=>{
        setIsLoading1(true)
        try{
          const body={
            "vote": "upVote",
            "change": "increase"
        }
          await axios.patch(`${config.endpoint}v1/videos/${video._id}/votes`,body)
          setUpVote(upVote+1)
          setIsLoading1(false)
        }catch(e){
          enqueSnackbar(e.response.data.message,{variant:"error"})
          setIsLoading1(false)
        }
        
      }
      const handleDownVote=async()=>{
        setIsLoading2(true)
        try{
          const body={
            "vote": "downVote",
            "change": "increase"
        }
          await axios.patch(`${config.endpoint}v1/videos/${video._id}/votes`,body)
          setDownVote(downVote+1)
          setIsLoading2(false)
        }catch(e){
          enqueSnackbar(e.response.data.message,{variant:"error"})
          setIsLoading2(false)
        }        
      }
  return (
    <Stack  spacing={2}>
    <Box className="container">
      <iframe
        className="iframe"
        title={video.title}
        src={`https://www.${video.videoLink}`}
      />
    </Box>
    <Box sx={{px:1}}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack spacing={1} direction='column' alignItems='flex-start' justifyContent='flex-start'>
            <Typography color='white'>{video.title}</Typography>
            <Typography variant='body2' color='grey'>{video.contentRating}&nbsp;&nbsp;&bull;&nbsp;&nbsp;{video.releaseDate}</Typography>
          </Stack>
          <Stack spacing={1} direction='row' alignItems='center' justifyContent='flex-end'>
            <Button variant='contained' sx={upvote} onClick={handleUpVote}>{isLoading1?<CircularProgress color='inherit'/>:(<><ThumbUpIcon/>&nbsp;{upVote}</>)}</Button>
            <Button variant='text' sx={downvote} onClick={handleDownVote}>{isLoading2?<CircularProgress/>:(<><ThumbDownIcon/>&nbsp;{downVote}</>)}</Button>
          </Stack>
        </Stack>
    </Box>
    </Stack>
  );
};

export default Video;