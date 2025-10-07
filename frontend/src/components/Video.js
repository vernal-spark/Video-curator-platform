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
  // Determine if this is a Vimeo link (which can't be embedded)
  const isVimeo = video.videoLink?.includes("vimeo.com");
  const embedUrl = video.videoLink?.startsWith("http")
    ? video.videoLink
    : `https://www.${video.videoLink}`;

  return (
    <Stack spacing={1}>
      {isVimeo ? (
        // Vimeo: Show thumbnail with play button that opens in new tab
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            backgroundColor: "#000",
            cursor: "pointer",
            backgroundImage: `url(${video.previewImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => window.open(embedUrl, "_blank")}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "rgba(229, 9, 20, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(229, 9, 20, 1)",
                transform: "translate(-50%, -50%) scale(1.1)",
              },
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderLeft: "20px solid white",
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                marginLeft: "6px",
              }}
            />
          </Box>
          <Typography
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              px: 2,
              py: 1,
              borderRadius: 1,
              fontSize: "0.875rem",
            }}
          >
            Click to watch on Vimeo
          </Typography>
        </Box>
      ) : (
        // YouTube: Embed as usual
        <Box className="container">
          <iframe
            className="iframe"
            title={video.title}
            src={embedUrl}
            allowFullScreen
            loading="lazy"
          />
        </Box>
      )}

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
