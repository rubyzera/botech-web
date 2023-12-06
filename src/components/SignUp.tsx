import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  CircularProgress,
} from "@mui/material";
import { fileToImage64 } from "../hooks/useImage64";
import { createUser } from "../services/user.service";
import { useNavigate } from "react-router-dom";

import ProfilePic from "./utils/ProfilePic";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState<{
    message: string;
    wrongFields: Array<string>;
  }>({ message: "", wrongFields: [] });
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const fieldHasError = (
    field: string
  ): { error: boolean; message: string } => {
    const fieldIsWrong = !!error.wrongFields.includes(field);
    return { error: fieldIsWrong, message: fieldIsWrong ? error.message : "" };
  };

  const submitUser = async () => {
    try {
      setLoading(true);
      const sendData = {
        name,
        user,
        email,
        password,
      };
      const res = await createUser(sendData);
      if (!res.error) {
        navigate("/");
      }
    } catch (error: any) {
      const errorData = error.response.data;
      if (errorData?.error === true) {
        const { wrongFields, message } = errorData;
        setError({ wrongFields, message });
      }
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <img width={150} height={150} src="../logo-botech.svg" />

      <Box sx={{ mt: 1 }}>
        <Grid
          onChange={() => {
            setError({ message: "", wrongFields: [] });
          }}
          sx={{
            mt: 1,
            flex: 1,
            maxWidth: 600,
            alignContent: "space-around",
            justifyContent: "space-between",
          }}
          container
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              id="name"
              label={"name"}
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              InputLabelProps={{ shrink: true }}
              placeholder="ex: John"
              fullWidth
              error={fieldHasError("name").error}
              helperText={fieldHasError("name").message}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="user"
              label={"user"}
              required
              onChange={(e) => setUser(e.target.value)}
              value={user}
              fullWidth
              error={fieldHasError("user").error}
              helperText={fieldHasError("user").message}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <TextField
              id="email"
              label={"email"}
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type={"email"}
              fullWidth
              error={fieldHasError("email").error}
              helperText={fieldHasError("email").message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label={"password"}
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
              error={fieldHasError("password").error}
              helperText={fieldHasError("password").message}
            />
          </Grid>
        </Grid>
        <Button
          onClick={submitUser}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
        <Link sx={{ alignSelf: "flex-start" }} href="/" variant="body2">
          Login
        </Link>
      </Box>
    </Box>
  );
}
