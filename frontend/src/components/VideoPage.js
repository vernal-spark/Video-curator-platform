import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Divider, Skeleton, Card, Typography } from "@mui/material";
import HomePage from "./HomePage";
import Header from "./Header";
import Video from "./Video";
import { useSnackbar } from "notistack";
import { videoAPI } from "../services/api";

const VideoPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [selectVideo, setSelectVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const { videoId } = useParams();

  const fetchVideoById = useCallback(async () => {
    try {
      setLoading(true);
      const videoData = await videoAPI.getVideoById(videoId);

      setSelectVideo(videoData);
      setUpVote(videoData.votes?.upVotes || 0);
      setDownVote(videoData.votes?.downVotes || 0);
    } catch (error) {
      enqueueSnackbar(error.message || "Failed to load video", {
        variant: "error",
      });
      // Optionally redirect to home after error
      setTimeout(() => navigate("/"), 2000);
    } finally {
      setLoading(false);
    }
  }, [videoId, enqueueSnackbar, navigate]);

  const updateViews = useCallback(async () => {
    try {
      await videoAPI.updateViews(videoId);
    } catch (error) {
      // Silently fail for view count updates
      console.error("Failed to update view count:", error);
    }
  }, [videoId]);

  useEffect(() => {
    if (videoId) {
      fetchVideoById();
      updateViews();
    }
  }, [videoId, fetchVideoById, updateViews]);

  return (
    <Box
      minHeight="100vh"
      maxHeight="max-content"
      sx={{ background: (theme) => theme.palette.background.default }}
    >
      <Header videoPage />
      <Box
        sx={{
          pt: 2,
          px: { xs: 2, sm: 4, md: 8, lg: 10 },
        }}
      >
        {loading ? (
          <Card
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: 0,
              p: 2,
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ paddingTop: "56.25%", mb: 2 }}
            />
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="40%" height={30} />
          </Card>
        ) : selectVideo ? (
          <Video
            video={selectVideo}
            upVote={upVote}
            downVote={downVote}
            setUpVote={setUpVote}
            setDownVote={setDownVote}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: (theme) => theme.palette.text.secondary }}
            >
              Video not found
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 5 },
          mt: 3,
        }}
      >
        <Divider
          sx={{
            background: (theme) => theme.palette.grey[700],
            mb: 2,
          }}
        />
        <HomePage videopage />
      </Box>
    </Box>
  );
};

export default VideoPage;
