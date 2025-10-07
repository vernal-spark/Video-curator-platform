import React, { useMemo } from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Divider,
  Fade,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GENRES, AGE_RATINGS, SORT_OPTIONS } from "../constants";

/**
 * Filter Component - Modern, responsive filter bar with chips and dropdown
 * @param {Object} props - Component props
 */
const Filter = ({
  updateGenreFilter,
  genreFilter,
  ageFilter,
  updateAgeFilter,
  sortFilter,
  updateSortFilter,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * Handle genre selection/deselection
   */
  const handleGenreClick = (genre) => {
    if (genre === "All") {
      updateGenreFilter(["All"]);
      return;
    }

    let newGenres = [...genreFilter];

    // Remove "All" if selecting a specific genre
    if (newGenres.includes("All")) {
      newGenres = newGenres.filter((g) => g !== "All");
    }

    // Toggle genre selection
    if (newGenres.includes(genre)) {
      newGenres = newGenres.filter((g) => g !== genre);
      // If no genres selected, default to "All"
      if (newGenres.length === 0) {
        newGenres = ["All"];
      }
    } else {
      newGenres.push(genre);
    }

    updateGenreFilter(newGenres);
  };

  /**
   * Handle age rating selection
   */
  const handleAgeClick = (age) => {
    updateAgeFilter(ageFilter === age ? "Anyone" : age);
  };

  /**
   * Check if genre is selected
   */
  const isGenreSelected = (genre) => genreFilter.includes(genre);

  /**
   * Check if age rating is selected
   */
  const isAgeSelected = (age) => ageFilter === age;

  /**
   * Count active filters
   */
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (!genreFilter.includes("All")) count += genreFilter.length;
    if (ageFilter !== "Anyone") count += 1;
    if (sortFilter !== "releaseDate") count += 1;
    return count;
  }, [genreFilter, ageFilter, sortFilter]);

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 6, lg: 10 },
        py: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: (theme) => theme.palette.background.elevated,
          borderRadius: 2,
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Header with active filter count */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MovieFilterIcon
              sx={{ color: (theme) => theme.palette.primary.main }}
            />
            Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Fade in>
              <Chip
                label={`${activeFiltersCount} active`}
                size="small"
                color="primary"
                sx={{ fontWeight: 600 }}
              />
            </Fade>
          )}
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Genre Filter Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1.5,
              fontWeight: 600,
              color: (theme) => theme.palette.text.secondary,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MovieFilterIcon fontSize="small" />
            GENRES
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ gap: 1 }}
          >
            {GENRES.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                onClick={() => handleGenreClick(genre)}
                icon={
                  isGenreSelected(genre) ? (
                    <CheckCircleIcon sx={{ fontSize: "1rem !important" }} />
                  ) : undefined
                }
                sx={{
                  height: "36px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  backgroundColor: isGenreSelected(genre)
                    ? (theme) => theme.palette.primary.main
                    : (theme) => theme.palette.background.paper,
                  color: isGenreSelected(genre)
                    ? (theme) => theme.palette.primary.contrastText
                    : (theme) => theme.palette.text.primary,
                  border: "2px solid",
                  borderColor: isGenreSelected(genre)
                    ? (theme) => theme.palette.primary.main
                    : (theme) => theme.palette.grey[700],
                  "&:hover": {
                    backgroundColor: isGenreSelected(genre)
                      ? (theme) => theme.palette.primary.dark
                      : (theme) => theme.palette.grey[800],
                    transform: "translateY(-2px)",
                    boxShadow: (theme) =>
                      `0 4px 12px ${theme.palette.primary.main}40`,
                  },
                  "& .MuiChip-icon": {
                    color: "inherit",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Age Rating and Sort Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems={{ xs: "stretch", md: "flex-start" }}
        >
          {/* Age Rating Filter */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                color: (theme) => theme.palette.text.secondary,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SupervisedUserCircleIcon fontSize="small" />
              AGE RATING
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{ gap: 1 }}
            >
              {AGE_RATINGS.map((age) => (
                <Chip
                  key={age}
                  label={age}
                  onClick={() => handleAgeClick(age)}
                  icon={
                    isAgeSelected(age) ? (
                      <CheckCircleIcon sx={{ fontSize: "1rem !important" }} />
                    ) : undefined
                  }
                  sx={{
                    height: "36px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    minWidth: "70px",
                    transition: "all 0.3s ease",
                    backgroundColor: isAgeSelected(age)
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.background.paper,
                    color: isAgeSelected(age)
                      ? (theme) => theme.palette.primary.contrastText
                      : (theme) => theme.palette.text.primary,
                    border: "2px solid",
                    borderColor: isAgeSelected(age)
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.grey[700],
                    "&:hover": {
                      backgroundColor: isAgeSelected(age)
                        ? (theme) => theme.palette.primary.dark
                        : (theme) => theme.palette.grey[800],
                      transform: "translateY(-2px)",
                      boxShadow: (theme) =>
                        `0 4px 12px ${theme.palette.primary.main}40`,
                    },
                    "& .MuiChip-icon": {
                      color: "inherit",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Sort Dropdown */}
          <Box sx={{ minWidth: { xs: "100%", md: "200px" } }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                color: (theme) => theme.palette.text.secondary,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SortIcon fontSize="small" />
              SORT BY
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={sortFilter}
                onChange={(e) => updateSortFilter(e.target.value)}
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
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
                  "& .MuiSelect-select": {
                    py: 1.2,
                  },
                }}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default React.memo(Filter);
