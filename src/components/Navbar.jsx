import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Home
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
