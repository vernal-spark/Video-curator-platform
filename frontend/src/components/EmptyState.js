import React from "react";
import { Box, Typography, Button } from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SearchOffIcon from "@mui/icons-material/SearchOff";

/**
 * EmptyState component - Displays when no videos are found
 * @param {string} type - Type of empty state ('no-results' or 'no-videos')
 * @param {Function} onReset - Callback to reset filters
 */
const EmptyState = ({ type = "no-results", onReset }) => {
  const isNoResults = type === "no-results";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        p: 4,
        textAlign: "center",
      }}
    >
      {isNoResults ? (
        <SearchOffIcon
          sx={{
            fontSize: 120,
            color: (theme) => theme.palette.text.disabled,
            mb: 3,
          }}
        />
      ) : (
        <VideoLibraryIcon
          sx={{
            fontSize: 120,
            color: (theme) => theme.palette.text.disabled,
            mb: 3,
          }}
        />
      )}

      <Typography
        variant="h4"
        sx={{
          color: (theme) => theme.palette.text.primary,
          mb: 2,
          fontWeight: 600,
        }}
      >
        {isNoResults ? "No videos found" : "No videos available"}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          mb: 4,
          maxWidth: 500,
        }}
      >
        {isNoResults
          ? "Try adjusting your search or filters to find what you're looking for."
          : "Start by uploading your first video to the platform."}
      </Typography>

      {isNoResults && onReset && (
        <Button
          variant="contained"
          color="primary"
          onClick={onReset}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          Clear Filters
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
