import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
import "./App.css";
import SideBar from "./components/sidebar/SideBar";
import Hospital from "./pages/Hospital";
import Patient from "./pages/Patient";
import Ward from "./pages/Ward";

function App() {
  return (
    <>
      <Router>
        <Box minH={'100vh'} display={"flex"}>
          <Box className="sidebar">
            <SideBar />
          </Box>
          <Box className="main">
            <Routes>
              <Route path="/" element={<Hospital />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/ward" element={<Ward />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </>
  );
}

export default App;
