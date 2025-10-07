import React, { useState, useCallback } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Modal,
  Paper,
  Fade,
  IconButton,
  Divider,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { videoAPI } from "../services/api";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LinkIcon from "@mui/icons-material/Link";
import TitleIcon from "@mui/icons-material/Title";
import CategoryIcon from "@mui/icons-material/Category";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSnackbar } from "notistack";
import { GENRES, AGE_RATINGS, PLATFORMS } from "../constants";

/**
 * VideoUpload Component - Modern upload button and modal
 * @param {Function} defaultApiCall - Callback to refresh video list
 */
const VideoUpload = ({ defaultApiCall }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [platform, setPlatform] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [originalLink, setOriginalLink] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [age, setAge] = useState("");
  const [value, setValue] = useState(dayjs(new Date()));

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => {
    if (uploading) return;
    setPlatform("");
    setVideoLink("");
    setOriginalLink("");
    setPreviewImage("");
    setTitle("");
    setAge("");
    setGenre("");
    setValue(dayjs(new Date()));
    setOpen(false);
  }, [uploading]);

  const handleVideoLink = useCallback(
    (link) => {
      if (!link.trim()) {
        setVideoLink("");
        setPreviewImage("");
        setOriginalLink("");
        return;
      }

      if (!platform) {
        enqueueSnackbar("Please select a platform first", {
          variant: "warning",
        });
        return;
      }

      try {
        const url = new URL(link);
        let vLink, pImage;

        if (platform === "youtube") {
          const videoParam = url.searchParams.get("v");
          if (!videoParam) {
            enqueueSnackbar("Invalid YouTube URL", { variant: "error" });
            return;
          }
          vLink = `youtube.com/embed/${videoParam}`;
          pImage = `https://i.ytimg.com/vi/${videoParam}/mqdefault.jpg`;
        } else if (platform === "vimeo") {
          const videoParam = url.pathname.substring(1).split("/")[0];
          if (!videoParam) {
            enqueueSnackbar("Invalid Vimeo URL", { variant: "error" });
            return;
          }
          // Store as direct vimeo link instead of embed URL due to Vimeo restrictions
          vLink = `vimeo.com/${videoParam}`;
          pImage = `https://vumbnail.com/${videoParam}.jpg`;
        }

        setPreviewImage(pImage);
        setVideoLink(vLink);
        setOriginalLink(link);
        enqueueSnackbar("✓ Video link validated!", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Invalid URL format", { variant: "error" });
      }
    },
    [platform, enqueueSnackbar]
  );

  const uploadVideo = useCallback(async () => {
    // Validation
    if (!platform) {
      enqueueSnackbar("Platform is required", { variant: "warning" });
      return;
    }
    if (!videoLink) {
      enqueueSnackbar("Video link is required", { variant: "warning" });
      return;
    }
    if (!title.trim()) {
      enqueueSnackbar("Title is required", { variant: "warning" });
      return;
    }
    if (!genre) {
      enqueueSnackbar("Genre is required", { variant: "warning" });
      return;
    }
    if (!age) {
      enqueueSnackbar("Age rating is required", { variant: "warning" });
      return;
    }

    const body = {
      videoLink: videoLink,
      title: title.trim(),
      genre: genre,
      contentRating: age,
      releaseDate: value.format("DD MMM YYYY"),
      previewImage: previewImage,
    };

    setUploading(true);
    try {
      await videoAPI.createVideo(body);
      enqueueSnackbar("🎉 Video uploaded successfully!", {
        variant: "success",
      });
      handleClose();
      defaultApiCall();
    } catch (error) {
      enqueueSnackbar(error.message || "Failed to upload video", {
        variant: "error",
      });
    } finally {
      setUploading(false);
    }
  }, [
    platform,
    videoLink,
    title,
    genre,
    age,
    value,
    previewImage,
    enqueueSnackbar,
    handleClose,
    defaultApiCall,
  ]);

  return (
    <>
      {/* Modern Upload Button */}
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          px: 3,
          py: 1,
          fontWeight: 600,
          fontSize: "0.95rem",
          textTransform: "none",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(229, 9, 20, 0.4)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(229, 9, 20, 0.6)",
          },
        }}
      >
        Upload
      </Button>

      {/* Modern Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <Paper
            elevation={24}
            sx={{
              width: { xs: "90%", sm: "500px", md: "600px" },
              maxHeight: "90vh",
              overflow: "auto",
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: 3,
              outline: "none",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: (theme) => `1px solid ${theme.palette.grey[800]}`,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <VideoLibraryIcon
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      fontSize: 32,
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    Upload Video
                  </Typography>
                </Stack>
                <IconButton
                  onClick={handleClose}
                  disabled={uploading}
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.grey[800],
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <Typography
                variant="body2"
                sx={{ color: (theme) => theme.palette.text.secondary, mt: 0.5 }}
              >
                Share your favorite videos with the community
              </Typography>
            </Box>

            {/* Form Content */}
            <Box sx={{ p: 3, overflow: "auto" }}>
              <Stack spacing={3}>
                {/* Platform Selection */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <YouTubeIcon fontSize="small" />
                    Platform *
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      displayEmpty
                      disabled={uploading}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: (theme) => theme.palette.grey[700],
                          borderWidth: "2px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select platform</em>
                      </MenuItem>
                      {PLATFORMS.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    Choose the platform where your video is hosted
                  </Typography>
                </Box>

                {/* Video Link */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LinkIcon fontSize="small" />
                    Video Link *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={originalLink}
                    onChange={(e) => handleVideoLink(e.target.value)}
                    disabled={uploading || !platform}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkIcon
                            sx={{
                              color: (theme) => theme.palette.text.secondary,
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: videoLink && (
                        <InputAdornment position="end">
                          <CheckCircleIcon
                            sx={{
                              color: (theme) => theme.palette.success.main,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: (theme) => theme.palette.grey[700],
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    Paste the full URL from {platform || "your platform"}
                  </Typography>
                </Box>

                {/* Title */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TitleIcon fontSize="small" />
                    Video Title *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter a descriptive title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={uploading}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: (theme) => theme.palette.grey[700],
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    A clear title helps others find your video
                  </Typography>
                </Box>

                <Divider />

                {/* Genre and Age Rating Row */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  {/* Genre */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CategoryIcon fontSize="small" />
                      Genre *
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        displayEmpty
                        disabled={uploading}
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) => theme.palette.grey[700],
                            borderWidth: "2px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) => theme.palette.primary.main,
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) => theme.palette.primary.main,
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Select genre</em>
                        </MenuItem>
                        {GENRES.filter((g) => g !== "All").map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Age Rating */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <SupervisedUserCircleIcon fontSize="small" />
                      Age Rating *
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        displayEmpty
                        disabled={uploading}
                        sx={{
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) => theme.palette.grey[700],
                            borderWidth: "2px",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) => theme.palette.primary.main,
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) => theme.palette.primary.main,
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Select rating</em>
                        </MenuItem>
                        {AGE_RATINGS.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>

                {/* Date Picker */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CalendarTodayIcon fontSize="small" />
                    Release Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      disabled={uploading}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: (theme) => theme.palette.grey[700],
                                borderWidth: "2px",
                              },
                              "&:hover fieldset": {
                                borderColor: (theme) =>
                                  theme.palette.primary.main,
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: (theme) =>
                                  theme.palette.primary.main,
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <Typography
                    variant="caption"
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    When was this video originally published?
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Footer Actions */}
            <Box
              sx={{
                p: 3,
                borderTop: (theme) => `1px solid ${theme.palette.grey[800]}`,
                backgroundColor: (theme) => theme.palette.background.elevated,
              }}
            >
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  disabled={uploading}
                  sx={{
                    px: 3,
                    borderColor: (theme) => theme.palette.grey[700],
                    color: (theme) => theme.palette.text.secondary,
                    "&:hover": {
                      borderColor: (theme) => theme.palette.grey[600],
                      backgroundColor: (theme) => theme.palette.grey[900],
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={uploadVideo}
                  disabled={uploading}
                  startIcon={
                    uploading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <CloudUploadIcon />
                    )
                  }
                  sx={{
                    px: 4,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                    "&.Mui-disabled": {
                      backgroundColor: (theme) => theme.palette.grey[800],
                    },
                  }}
                >
                  {uploading ? "Uploading..." : "Upload Video"}
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};

export default React.memo(VideoUpload);
