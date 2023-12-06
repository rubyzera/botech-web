import { Box, Button, Typography } from "@mui/material";
import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";

const NavBar = ({
  changePage,
}: {
  changePage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      >
      <img
        title="logo"
        style={{ alignSelf: "center", width: "90%", margin: "20px 0px 20px 0px" }}
        src="../logo-botech.svg"
      />
      <Box
        sx={{
          m: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          height: "30vh",
        }}
      >
        <Button
          sx={{width: "85%"}}
          color="primary"
          variant="contained"
          onClick={() => changePage(0)}
        >
          <GroupsIcon fontSize="medium" />
          <Typography
            sx={{ m: 1, display: { xs: "none", lg: "block" } }}
            fontSize={15}
          >
            Usuários
          </Typography>
        </Button>
        <Button
          sx={{width: "85%"}}
          color="primary"
          variant="contained"
          onClick={() => changePage(1)}
        >
          <AutoAwesomeMotionIcon fontSize="medium" />
          <Typography
            sx={{ m: 1, display: { xs: "none", lg: "block" } }}
            fontSize={15}
          >
            Comandas
          </Typography>
        </Button>
        <Button
          sx={{width: "85%"}}
          color="primary"
          variant="contained"
          onClick={() => changePage(2)}
        >
          <AssignmentIcon fontSize="medium" />
          <Typography
            sx={{ m: 1, display: { xs: "none", lg: "block" } }}
            fontSize={15}
          >
            Estoque
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export { NavBar };
