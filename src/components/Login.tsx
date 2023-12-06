import { useContext, useState, useEffect } from "react";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { currentLogin, setCurrentLogin, setAuth, verifyAuth, getAuth } =
    useAuth();
  const [error, setError] = useState({
    error: false,
    message: "",
    found: false,
  });

  useEffect(() => {
    const { token, user } = getAuth();
    const verify = async (verifyToken: string, verifyUser: string) => {
      const res = await verifyAuth(verifyToken);
      if (!res) return;
      if (res.verified) {
        setCurrentLogin({ currentUser: verifyUser, token: verifyToken });
        navigate("/home");
      }
    };
    if (!currentLogin.currentUser && !currentLogin.token) {
      verify(token, user);
    } else {
      verify(currentLogin.token, currentLogin.currentUser);
    }
  }, [currentLogin]);

  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async () => {
    const authRes = await setAuth(emailField, passwordField);
    const { currentUser, token } = authRes;
    if (authRes.success) {
      setCurrentLogin({
        currentUser: authRes.currentUser,
        token: authRes.token,
      });
      if (remember) {
        localStorage.setItem("@cloneTwitter:token", token);
        localStorage.setItem("@cloneTwitter:user", currentUser);
      } else {
        localStorage.clear();
      }

      navigate("/home");
      return;
    }

    setError({
      error: authRes.error,
      message: authRes?.message || "",
      found: authRes?.found,
    });
  };

  return (
    <Box
      sx={{
        paddingTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        height: '100vh'
      }}
    >
      <img title="logo" width={150} height={150} src="../logo-botech.svg" />
      <Box sx={{ mt: 1 }}>
        <TextField
          value={emailField}
          margin="normal"
          required
          fullWidth
          id="email"
          onChange={(e) => {
            setEmailField(e.target.value);
            setError((e) => ({ ...e, error: false, message: "" }));
          }}
          label="Email Address"
          name="email"
          autoComplete="email"
          error={error.error && !error?.found}
          helperText={error?.found ? "" : error.message}
        />
        <TextField
          value={passwordField}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(e) => {
            setPasswordField(e.target.value);
            setError((e) => ({ ...e, error: false, message: "" }));
          }}
          autoComplete="current-password"
          error={error.error && error?.found}
          helperText={error?.found ? error.message : ""}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={remember}
              color="primary"
              onChange={(e) => setRemember(!remember)}
            />
          }
          label="Remember me"
        />
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

        <Link href="/signup" variant="body2">
          Sign Up
        </Link>
      </Box>
    </Box>
  );
}
