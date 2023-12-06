import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { AuthProvider } from "./hooks/useAuth";
import ErrorPage from "./misc/error-page";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { SWRConfig } from "swr";

import { api } from "./services/api";

const theme = createTheme({
  palette: {
    primary: { main: "#FECA0B", contrastText: "#FFF" },
    secondary: { main: "#FFF", contrastText: "#383A3C" },
    background: { default: "#383A3C" },
  },
});

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            refreshInterval: 5 * 1000,
            fetcher: ([url, params]) =>
              api(url, "get", { params }).then((res) => res),
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: ({ palette }) => palette.secondary.main,
            }}
          >
            <RouterProvider router={router} />
          </Box>
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
