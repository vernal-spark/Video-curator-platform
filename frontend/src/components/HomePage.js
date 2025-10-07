import React from "react";
import { Box, Grid, Skeleton, Card, Typography, Fade } from "@mui/material";
import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./Header";
import Filter from "./Filter";
import VideoCard from "./VideoCard";
import EmptyState from "./EmptyState";
import { useSnackbar } from "notistack";
import { videoAPI } from "../services/api";

const HomePage = ({ videopage }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, updateGenreFilter] = useState(["All"]);
  const [ageFilter, updateAgeFilter] = useState("Anyone");
  const [sortFilter, updateSortFilter] = useState("releaseDate");
  const [isLoading, setIsLoading] = useState(false);

  // Memoize API parameters to prevent unnecessary calls
  const apiParams = useMemo(() => {
    const params = {
      genres: genreFilter.join(","),
      contentRating: ageFilter,
      sortBy: sortFilter,
    };

    if (search.trim()) {
      params.title = search.trim();
    }

    return params;
  }, [search, genreFilter, ageFilter, sortFilter]);

  const fetchVideos = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const response = await videoAPI.getVideos(params);
        const videosData = response.videos || response.data || [];
        setVideos(videosData);

        if (videosData.length === 0 && Object.keys(params).length > 0) {
          // Show message if no results found with filters
          enqueueSnackbar("No videos found matching your criteria", {
            variant: "info",
          });
        }
      } catch (error) {
        enqueueSnackbar(error.message || "Failed to fetch videos", {
          variant: "error",
        });
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  const resetFilters = useCallback(() => {
    setSearch("");
    updateGenreFilter(["All"]);
    updateAgeFilter("Anyone");
    updateSortFilter("releaseDate");
  }, []);

  const defaultApiCall = useCallback(() => {
    fetchVideos();
  }, [fetchVideos]);

  const performAPICall = useCallback(() => {
    fetchVideos(apiParams);
  }, [fetchVideos, apiParams]);

  // Only call performAPICall on mount and when filters change
  useEffect(() => {
    performAPICall();
  }, [performAPICall]);

  // Check if filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      search.trim() !== "" ||
      !genreFilter.includes("All") ||
      ageFilter !== "Anyone" ||
      sortFilter !== "releaseDate"
    );
  }, [search, genreFilter, ageFilter, sortFilter]);

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: (theme) => theme.palette.background.default,
      }}
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
          px: { xs: 2, sm: 3, md: 6, lg: 10 },
          pb: 4,
        }}
      >
        {!isLoading && videos.length === 0 ? (
          <EmptyState
            type={hasActiveFilters ? "no-results" : "no-videos"}
            onReset={hasActiveFilters ? resetFilters : null}
          />
        ) : (
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 3 }}
            sx={{ alignItems: "stretch" }}
          >
            {(isLoading ? Array.from(new Array(12)) : videos).map(
              (ele, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Fade in timeout={300 + index * 50}>
                    <div style={{ height: "100%" }}>
                      {ele ? (
                        <VideoCard video={ele} />
                      ) : (
                        <Card
                          sx={{
                            backgroundColor: (theme) =>
                              theme.palette.background.paper,
                            border: 0,
                            boxShadow: 0,
                            height: "100%",
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            sx={{ paddingTop: "56.25%" }}
                          />
                          <Box sx={{ p: 2 }}>
                            <Skeleton variant="text" width="80%" height={30} />
                            <Skeleton variant="text" width="60%" height={20} />
                            <Skeleton variant="text" width="40%" height={20} />
                          </Box>
                        </Card>
                      )}
                    </div>
                  </Fade>
                </Grid>
              )
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
