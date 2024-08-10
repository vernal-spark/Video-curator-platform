import { Box, Button } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import "./Filter.css";

const Filter = ({
  updateGenreFilter,
  genreFilter,
  ageFilter,
  updateAgeFilter,
  sortFilter,
  updateSortFilter,
}) => {
  const updateGenre = (genre) => {
    if (genre === "All") {
      updateGenreFilter(["All"]);
    } else {
      if (genreFilter.includes("All")) {
        updateGenreFilter((prev) => {
          const index = prev.indexOf(genre);
          prev.splice(index, 1);
          return [...prev];
        });
      }
      if (genreFilter.includes(genre)) {
        const index = genreFilter.indexOf(genre);
        genreFilter.splice(index, 1);
        if (genreFilter.length === 0) {
          updateGenreFilter(["All"]);
        } else {
          updateGenreFilter([...genreFilter]);
        }
      } else {
        updateGenreFilter((prev) => [...prev, genre]);
      }
    }
  };

  const updateAge = (age) => {
    if (ageFilter === age) {
      updateAgeFilter("Anyone");
    } else {
      updateAgeFilter(age);
    }
  };

  const selected = {
    borderRadius: "15px",
    height: "2rem",
    color: "black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "grey",
    },
  };
  const not_selected = {
    borderRadius: "15px",
    height: "2rem",
    color: "white",
    backgroundColor: "#202020",
    "&:hover": {
      backgroundColor: "grey",
    },
  };
  return (
    <Box className="filter">
      <Box className="c2">
        <Box className="c1">
          <Button
            value="All"
            sx={genreFilter.includes("All") ? selected : not_selected}
            onClick={(e) => updateGenre(e.target.value)}
          >
            All
          </Button>
          <Button
            value="Education"
            sx={genreFilter.includes("Education") ? selected : not_selected}
            onClick={(e) => updateGenre(e.target.value)}
          >
            Education
          </Button>
          <Button
            value="Sports"
            sx={genreFilter.includes("Sports") ? selected : not_selected}
            onClick={(e) => updateGenre(e.target.value)}
          >
            Sports
          </Button>
          <Button
            value="Comedy"
            sx={genreFilter.includes("Comedy") ? selected : not_selected}
            onClick={(e) => updateGenre(e.target.value)}
          >
            Comedy
          </Button>
          <Button
            value="Lifestyle"
            sx={genreFilter.includes("Lifestyle") ? selected : not_selected}
            onClick={(e) => updateGenre(e.target.value)}
          >
            Lifestyle
          </Button>
          <Button
            value="Movies"
            sx={genreFilter.includes("Movies") ? selected : not_selected}
            onClick={(e) => updateGenre(e.target.value)}
          >
            Movies
          </Button>
        </Box>
        <Box>
          <Box
            sx={{
              bgcolor: "#fff",
              color: "#000",
              width: "12em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 0.5,
              borderRadius: 5,
            }}
          >
            Sort by
            <SwapVertIcon />:
            <select
              // sx={dropdown}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                outline: "none",
              }}
              value={sortFilter}
              onChange={(e) => updateSortFilter(e.target.value)}
              label="Sort By"
              required
            >
              <option value="releaseDate">Release Date</option>
              <option value="viewCount">View Count</option>
            </select>
          </Box>
        </Box>
      </Box>
      <Box className="c1">
        <Button
          value="Anyone"
          sx={ageFilter === "Anyone" ? selected : not_selected}
          onClick={(e) => updateAge(e.target.value)}
        >
          Anyone
        </Button>
        <Button
          value="7%2B"
          sx={ageFilter === "7%2B" ? selected : not_selected}
          onClick={(e) => updateAge(e.target.value)}
        >
          7+
        </Button>
        <Button
          value="12%2B"
          sx={ageFilter === "12%2B" ? selected : not_selected}
          onClick={(e) => updateAge(e.target.value)}
        >
          12+
        </Button>
        <Button
          value="16%2B"
          sx={ageFilter === "16%2B" ? selected : not_selected}
          onClick={(e) => updateAge(e.target.value)}
        >
          16+
        </Button>
        <Button
          value="18%2B"
          sx={ageFilter === "18%2B" ? selected : not_selected}
          onClick={(e) => updateAge(e.target.value)}
        >
          18+
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
