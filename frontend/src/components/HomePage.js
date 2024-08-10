import { Box, Grid, Skeleton, Card, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Header";
import Filter from "./Filter";
import VideoCard from "./VideoCard";
import { ClimbingBoxLoader } from "react-spinners";
import { useSnackbar } from "notistack";
import { config } from "../App";
// export const FilterContext=createContext()
const HomePage = ({ videopage }) => {
  const { enqueSnackbar } = useSnackbar();
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, updateGenreFilter] = useState(["All"]);
  const [ageFilter, updateAgeFilter] = useState("Anyone");
  const [sortFilter, updateSortFilter] = useState("releaseDate");
  const [isLoading, setIsLoading] = useState(false);

  const defaultApiCall = async () => {
    let url = `${config.endpoint}v1/videos`;
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setVideos(res.data.videos);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response && e.response.status === 500) {
          enqueSnackbar(e.response.data.message, { variant: "error" });
        } else {
          enqueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        }
      });
  };

  const performAPICall = async () => {
    let url;
    if (search === "") {
      url = `${config.endpoint}v1/videos?genres=${genreFilter}&contentRating=${ageFilter}&sortBy=${sortFilter}`;
    } else {
      url = `${config.endpoint}v1/videos?title=${search}&genres=${genreFilter}&contentRating=${ageFilter}&sortBy=${sortFilter}`;
    }

    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setVideos(res.data.videos);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response && e.response.status === 500) {
          enqueSnackbar(e.response.data.message, { variant: "error" });
        } else {
          enqueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        }
      });
  };

  useEffect(() => {
    defaultApiCall();
  }, []);

  useEffect(() => {
    performAPICall();
  }, [genreFilter, ageFilter, sortFilter, search]);

  return (
    <Box
      minHeight="100vh"
      maxHeight="max-content"
      sx={{ background: "#181818" }}
    >
      {!videopage && (
        <>
          <Header
            search={search}
            setSearch={setSearch}
            defaultApiCall={defaultApiCall}
          />
          <Filter
            genreFilter={genreFilter}
            updateGenreFilter={updateGenreFilter}
            ageFilter={ageFilter}
            updateAgeFilter={updateAgeFilter}
            sortFilter={sortFilter}
            updateSortFilter={updateSortFilter}
          />
        </>
      )}
      <Box
        sx={{
          pt: 2,
          px: 1,
          "@media screen and (min-width: 1073px)": { px: 10 },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          // sx={{background:'#181818'}}
        >
          {(isLoading ? Array.from(new Array(12)) : videos).map(
            (ele, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                {ele ? (
                  <VideoCard video={ele} />
                ) : (
                  <Card
                    style={{ backgroundColor: "#181818" }}
                    sx={{ border: 0, boxShadow: 0 }}
                  >
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      variant="rectangle"
                      width={400}
                      height={200}
                    />
                    <Skeleton
                      sx={{ bgcolor: "grey.900", my: 1 }}
                      variant="rectangle"
                      width={300}
                    />
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      variant="rectangle"
                      width={275}
                    />
                  </Card>
                )}
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
};
export default HomePage;
