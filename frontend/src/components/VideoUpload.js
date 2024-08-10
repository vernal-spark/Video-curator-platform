import {
  Box,
  Stack,
  Button,
  Typography,
  TextField,
  styled,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Modal,
  FormSelect,
} from "@mui/material";
import { config } from "../App";
import dayjs from "dayjs";
import axios from "axios";
import UploadIcon from "@mui/icons-material/Upload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useSnackbar } from "notistack";

const dropdown = {
  "&.MuiInputBase-root": {
    "& .MuiSvgIcon-root": {
      color: "white",
    },
    "& .MuiSelect-select": {
      color: "white",
    },
    "& fieldset": {
      borderColor: "#808080",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
};

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const years = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const VideoUpload = ({ defaultApiCall }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState(
    new Date().getDate() +
      " " +
      years[new Date().getMonth()] +
      " " +
      new Date().getFullYear()
  );
  const [value, setValue] = useState(dayjs(new Date()));

  const genreArr = [
    "Education",
    "Sports",
    "Movies",
    "Comedy",
    "Lifestyle",
    "All",
  ];

  const ageArr = ["Anyone", "7+", "12+", "16+", "18+"];

  const platformArr = ["youtube", "vimeo"];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20rem",
    bgcolor: "#181818",
    boxShadow: 24,
    p: 4,
    color: "white",
  };
  const container = {
    position: "relative",
    width: "20rem",
    left: "50rem",
    top: "15vh",
    background: "#181818",
    padding: "12px",
    color: "white",
    borderRadius: "4px",
    "@media screen and (max-width:1700px)": {
      position: "relative",
      left: "25rem",
      top: "15vh",
    },
    "@media screen and (max-width:991px)": {
      position: "relative",
      left: "18rem",
      top: "15vh",
    },
    "@media screen and (max-width:767px)": {
      position: "relative",
      left: "3.1rem",
      top: 0,
    },
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setPlatform("");
    setVideoLink("");
    setPreviewImage("");
    setTitle("");
    setAge("");
    setGenre("");
    setDate(
      new Date().getDate() +
        " " +
        years[new Date().getMonth()] +
        " " +
        new Date().getFullYear()
    );
    setOpen(false);
  };

  const handleVideoLink = (link) => {
    if (platform === "") {
      setVideoLink("");
      enqueueSnackbar("Enter the Platform", { variant: "warning" });
    }
    const url = new URL(link);
    let vLink, pImage;
    if (platform === "youtube") {
      const videoParam = url.searchParams.get("v");
      vLink = `youtube.com/embed/${videoParam}`;
      pImage = `https://i.ytimg.com/vi/${videoParam}/mqdefault.jpg`;
    } else if (platform === "vimeo") {
      const videoParam = url.pathname.substr(1);
      vLink = `https://player.vimeo.com/video/${videoParam}`;
      pImage = `https://vumbnail.com//${videoParam}.jpg`;
      console.log(vLink);
    }
    setPreviewImage(pImage);
    setVideoLink(vLink);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);
    const date = newValue.date();
    const month = years[newValue.month()];
    const fullYear = newValue.year();
    const dateString = date + " " + month + " " + fullYear;
    setDate(dateString);
  };

  const uploadVideo = async () => {
    const body = {
      videoLink: videoLink,
      title: title,
      genre: genre,
      contentRating: age,
      releaseDate: date,
      previewImage: previewImage,
    };
    if (
      body.videoLink &&
      body.title &&
      body.genre &&
      body.contentRating &&
      body.releaseDate &&
      body.previewImage
    ) {
      try {
        await axios.post(`${config.endpoint}v1/videos/`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleClose();
        defaultApiCall();
        enqueueSnackbar("Uploaded Successfully", { variant: "success" });
      } catch (e) {
        console.log(e);
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
    } else if (!body.videoLink) {
      enqueueSnackbar("link must be a valid url", { variant: "warning" });
    } else {
      enqueueSnackbar("All fields are required", { variant: "warning" });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        <UploadIcon />
        Upload
      </Button>
      <Modal open={open}>
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h6">Upload Video</Typography>
            <Button sx={{ color: "white" }} onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Box>
              <FormControl fullWidth>
                <InputLabel
                  id="select-label"
                  sx={{
                    "&.MuiInputLabel-root": {
                      color: "white",
                      borderColor: "white",
                    },
                  }}
                >
                  Platform
                </InputLabel>
                <Select
                  sx={dropdown}
                  labelId="select-label"
                  id="demo-simple-select"
                  value={platform}
                  label="Platform"
                  onChange={(e) => setPlatform(e.target.value)}
                  required
                >
                  {platformArr.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption">
                Enter the platfrom from which you are taking the video
              </Typography>
            </Box>
            <Box>
              <CssTextField
                fullWidth
                label="Video Link"
                InputProps={{ style: { color: "white" } }}
                onChange={(e) => handleVideoLink(e.target.value)}
              />
              <Typography variant="caption">
                This link will used to derive the video
              </Typography>
            </Box>
            {/* <Box>
              <CssTextField
                fullWidth
                InputProps={{ style: { color: "white" } }}
                label="Thumbnail Image Link"
                onChange={(e) => setPreviewImage(e.target.value)}
              />
              <Typography variant="caption">
                This link will be used to preview the thumbnail image
              </Typography>
            </Box> */}
            <Box>
              <CssTextField
                fullWidth
                InputProps={{ style: { color: "white" } }}
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Typography variant="caption">
                The title will be reprensentative text for video
              </Typography>
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel
                  id="select-label"
                  sx={{
                    "&.MuiInputLabel-root": {
                      color: "white",
                      borderColor: "white",
                    },
                  }}
                >
                  Genre
                </InputLabel>
                <Select
                  sx={dropdown}
                  labelId="select-label"
                  id="demo-simple-select"
                  value={genre}
                  label="Genre"
                  onChange={(e) => setGenre(e.target.value)}
                  required
                >
                  {genreArr.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption">
                Genre will help in categorizing your videos
              </Typography>
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel
                  id="select-label"
                  sx={{
                    "&.MuiInputLabel-root": {
                      color: "white",
                      borderColor: "white",
                    },
                  }}
                >
                  Suitable age group for the clip
                </InputLabel>
                <Select
                  sx={dropdown}
                  labelId="select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Suitable age group for the clip"
                  onChange={(e) => setAge(e.target.value)}
                  required
                >
                  {ageArr.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption">
                This will be usd to filter videos on age group suitability
              </Typography>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&.MuiInputBase-root": {
                          color: "white",
                        },
                        "& fieldset": {
                          borderColor: "#808080",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    label="Upload and Publish date"
                    value={value}
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Typography variant="caption">
                This will be used to sort the videos
              </Typography>
            </Box>
          </Stack>
          <Stack sx={{ mt: 2 }} direction="row">
            <Button
              variant="contained"
              onClick={uploadVideo}
              sx={{
                backgroundColor: "red",
                "&:hover": { backgroundColor: "black" },
              }}
            >
              Upload Video
            </Button>
            <Button sx={{ color: "#808080" }} onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default VideoUpload;
