import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  Box,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  getRelativeTime,
  formatViewCount,
  truncateText,
} from "../utils/helpers";

/**
 * VideoCard component - Displays a video card with thumbnail and metadata
 * @param {Object} video - Video data object
 */
const VideoCard = ({ video }) => {
  return (
    <Card
      sx={{
        background: (theme) => theme.palette.background.paper,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}40`,
        },
      }}
    >
      <Link
        style={{ textDecoration: "none", position: "relative" }}
        to={`/video/${video._id}`}
        aria-label={`Watch ${video.title}`}
      >
        <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
          <CardMedia
            component="img"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            image={video.previewImage}
            alt={video.title}
            loading="lazy"
          />
          {/* Content Rating Badge */}
          <Chip
            label={video.contentRating}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.75rem",
            }}
          />
        </Box>
      </Link>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 2,
        }}
      >
        <Tooltip title={video.title} arrow placement="top">
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: (theme) => theme.palette.text.primary,
              fontWeight: 600,
              fontSize: "1rem",
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.4,
            }}
          >
            {video.title}
          </Typography>
        </Tooltip>

        <Stack spacing={0.5} sx={{ mt: "auto" }}>
          <Chip
            label={video.genre}
            size="small"
            sx={{
              width: "fit-content",
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "white",
              fontSize: "0.7rem",
              height: "24px",
            }}
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{ mt: 1 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                fontSize: "0.875rem",
              }}
            >
              {getRelativeTime(video.releaseDate)}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <VisibilityIcon
                sx={{ fontSize: "1rem", color: "text.secondary" }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  fontSize: "0.875rem",
                }}
              >
                {formatViewCount(video.viewCount)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default React.memo(VideoCard);
