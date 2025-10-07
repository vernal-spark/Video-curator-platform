import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

/**
 * ErrorBoundary - Catches errors in component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            p: 4,
            textAlign: "center",
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 120,
              color: (theme) => theme.palette.error.main,
              mb: 3,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              color: (theme) => theme.palette.text.primary,
              mb: 2,
              fontWeight: 600,
            }}
          >
            Oops! Something went wrong
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              mb: 4,
              maxWidth: 600,
            }}
          >
            We're sorry for the inconvenience. Please try refreshing the page or
            contact support if the problem persists.
          </Typography>

          {this.state.error && (
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.disabled,
                mb: 4,
                maxWidth: 600,
                fontFamily: "monospace",
              }}
            >
              Error: {this.state.error.message}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReset}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
            }}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
