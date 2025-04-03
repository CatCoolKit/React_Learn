import { Box, Button, Spinner } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box minH={"100vh"}>
      <Navbar />
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="80vh"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      )}
    </Box>
  );
}

export default App;
