import { CheckBox } from "@mui/icons-material";
import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mockFlagAction } from "../redux/actions/CommonActions";

const Home = () => {
  const mockFlag = useSelector((state) => state.common.mock);
  const dispatch = useDispatch();
  console.log(mockFlag);

  const handleChange = () => {
    dispatch(mockFlagAction());
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        gap="1rem"
        alignItems="center"
        m={4}
      >
        <Checkbox checked={mockFlag} onChange={handleChange} />
        <Typography variant="h6">Mock Flag</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={"column"}
        gap="2rem"
        alignItems="center"
      >
        {mockFlag ? (
          <Link to="/todos/mock">Show Mock Todos</Link>
        ) : (
          <Link to="/todos/springboot">Show Springboot Todos</Link>
        )}
      </Box>
    </>
  );
};

export default Home;
