import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState, useCallback } from "react";
import "./Video.css";
import { useSnackbar } from "notistack";
import { videoAPI } from "../services/api";

const Video = ({ video, upVote, downVote, setUpVote, setDownVote }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isUpVoting, setIsUpVoting] = useState(false);
  const [isDownVoting, setIsDownVoting] = useState(false);

  const upvoteStyle = {
    color: "white",
    borderRadius: "10px",
  };

  const downvoteStyle = {
    color: "grey",
    background: "#202020",
    borderRadius: "10px",
  };

  const handleUpVote = useCallback(async () => {
    if (isUpVoting || isDownVoting) return;

    setIsUpVoting(true);
    try {
      const voteData = {
        vote: "upVote",
        change: "increase",
      };
      await videoAPI.updateVotes(video._id, voteData);
      setUpVote(upVote + 1);
      enqueueSnackbar("Upvoted successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message || "Failed to upvote", {
        variant: "error",
      });
    } finally {
      setIsUpVoting(false);
    }
  }, [video._id, upVote, setUpVote, enqueueSnackbar, isUpVoting, isDownVoting]);

  const handleDownVote = useCallback(async () => {
    if (isUpVoting || isDownVoting) return;

    setIsDownVoting(true);
    try {
      const voteData = {
        vote: "downVote",
        change: "increase",
      };
      await videoAPI.updateVotes(video._id, voteData);
      setDownVote(downVote + 1);
      enqueueSnackbar("Downvoted successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message || "Failed to downvote", {
        variant: "error",
      });
    } finally {
      setIsDownVoting(false);
    }
  }, [
    video._id,
    downVote,
    setDownVote,
    enqueueSnackbar,
    isUpVoting,
    isDownVoting,
  ]);
  return (
    <Stack spacing={2}>
      <Box className="container">
        <iframe
          className="iframe"
          title={video.title}
          src={`https://www.${video.videoLink}`}
          allowFullScreen
          loading="lazy"
        />
      </Box>
      <Box sx={{ px: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            spacing={1}
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Typography color="white" variant="h6">
              {video.title}
            </Typography>
            <Typography variant="body2" color="grey">
              {video.contentRating}&nbsp;&nbsp;&bull;&nbsp;&nbsp;
              {new Date(video.releaseDate).toLocaleDateString()}
            </Typography>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              sx={upvoteStyle}
              onClick={handleUpVote}
              disabled={isUpVoting || isDownVoting}
              aria-label={`Upvote ${video.title}`}
            >
              {isUpVoting ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <>
                  <ThumbUpIcon />
                  &nbsp;{upVote}
                </>
              )}
            </Button>
            <Button
              variant="text"
              sx={downvoteStyle}
              onClick={handleDownVote}
              disabled={isUpVoting || isDownVoting}
              aria-label={`Downvote ${video.title}`}
            >
              {isDownVoting ? (
                <CircularProgress size={20} />
              ) : (
                <>
                  <ThumbDownIcon />
                  &nbsp;{downVote}
                </>
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Video;
