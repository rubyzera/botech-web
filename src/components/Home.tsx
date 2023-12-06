import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { NavBar } from "./NavBar";

import { Users } from "./pages/Users";
import { Commands } from "./pages/Commands";
import { Storage } from "./pages/Storage";
import { CommandsProvider } from "../hooks/useCommands";

const Home = () => {
  const [page, setPage] = useState(0);
  const components = [
    <Users />,
    <CommandsProvider>
      <Commands />
    </CommandsProvider>,
    <Storage />,
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          width: "10vw",
          borderRadius: 2,
          backgroundColor: ({ palette }) => palette.background.default,
        }}
      >
        <NavBar changePage={setPage} />
      </Paper>
      <Paper
        elevation={1}
        sx={{ flex: 6, borderRadius: 2, padding: 5, overflowX: "auto" }}
      >
        {components[page]}
      </Paper>
    </Box>
  );
};

export default Home;
