import React from "react";
import { Route, Routes } from "react-router-dom";
import Todos from "./components/Todos";
import "./App.css";
import Home from "./components/Home";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/todos/:backend" element={<Todos />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
