import "./App.css";
import HomePage from "./components/HomePage";
import VideoPage from "./components/VideoPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
export const config = {
  endpoint: "http://localhost:8082/v1/",
};

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Router>
        <div className="App">
          <Routes>
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
