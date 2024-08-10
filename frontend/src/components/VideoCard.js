import { Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
const VideoCard = ({ video }) => {
  let date = new Date(video.releaseDate);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let currDate = new Date();
  let currday = currDate.getDate();
  let currmonth = currDate.getMonth();
  let curryear = currDate.getFullYear();
  let releaseYear, releaseMonth, releaseDay;
  year !== curryear
    ? (releaseYear = curryear - year)
    : month !== currmonth
    ? (releaseMonth = currmonth - month)
    : (releaseDay = currday - day);
  return (
    <Card sx={{ background: "#181818" }}>
      <Link style={{ textDecoration: "none" }} to={`/video/${video._id}`}>
        <CardMedia
          component="img"
          sx={{ objectFit: "cover" }}
          image={video.previewImage}
          alt="green iguana"
        />
      </Link>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          color: "#fff",
        }}
      >
        <Typography component="div">{video.title}</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2">{`${
            releaseYear
              ? releaseYear + ` year ago`
              : releaseMonth
              ? releaseMonth + ` month ago`
              : releaseDay + ` day ago`
          }`}</Typography>
          <Typography variant="body2">{video.viewCount}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default VideoCard;
