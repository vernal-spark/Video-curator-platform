import { Box, InputAdornment, Button, TextField, styled } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import logo from "../logo.svg";
import "./Header.css";
import VideoUpload from "./VideoUpload";
import { Link } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
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
const Header = ({ search, setSearch, videoPage, defaultApiCall }) => {
  return (
    <>
      <Box className="header">
        <Link to="/">
          <img src={logo} alt="logo-img"></img>
        </Link>
        {!videoPage && (
          <>
            <CssTextField
              placeholder="Search"
              className="search-desktop"
              InputProps={{
                style: {
                  paddingRight: 0,
                  fontFamily: "Arial",
                  border: "1px solid grey",
                  background: "#121212",
                  color: "grey",
                  borderColor: "grey.900",
                  width: "100%",
                  height: "29px",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      sx={{
                        bgcolor: "grey.900",
                        color: "white",
                        height: "27px",
                        pr: 0,
                      }}
                    >
                      <SearchRoundedIcon color="white" />
                    </Button>
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <VideoUpload defaultApiCall={defaultApiCall} />
          </>
        )}
      </Box>
      {!videoPage && (
        <CssTextField
          placeholder="Search"
          className="search-mobile"
          fullWidth
          InputProps={{
            style: {
              paddingRight: 0,
              fontFamily: "Arial",
              border: "1px solid grey",
              background: "#121212",
              color: "grey",
              borderColor: "white",
              width: "100%",
              height: "29px",
            },
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    height: "27px",
                    paddingRight: 0,
                  }}
                >
                  <SearchRoundedIcon color="white" />
                </Button>
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
    </>
  );
};
export default Header;
