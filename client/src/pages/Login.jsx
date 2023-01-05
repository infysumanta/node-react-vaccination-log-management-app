import React, { useEffect, useState } from "react";
import { Box, Card, FormControl, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import authApi from "./../api/authApi";
import { TOKEN_NAME, PRODUCTION_URL, DEVELOPMENT_URL } from "../utils/constant";
const Login = () => {
  const navigate = useNavigate();

  const [loginErr, setloginErr] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const res = await isAuthenticated();
      if (res) return navigate("/");
    };
    console.log(process.env.NODE_ENV);
    checkToken();
  }, []);

  const loginSubmit = async () => {
    setLoading(true);
    setloginErr(undefined);
    const checkErr = {
      username: username.trim().length === 0,
      password: password.trim().length === 0,
    };

    setUsernameErr(checkErr.username);
    setPasswordErr(checkErr.password);
    if (checkErr.username || checkErr.password) return;

    const params = {
      username,
      password,
    };

    try {
      const res = await authApi.login(params);
      localStorage.setItem(TOKEN_NAME, res.token);
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        setloginErr("Invalid Username or Password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: "#5298ca",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              maxWidth: "400px",
              "& .MuiTextField-root": { mb: 5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              margin: "auto",
              padding: "5rem 1rem",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              mb="4rem"
              fontWeight="700"
            >
              VACCINE DETAILS
            </Typography>
            <FormControl fullWidth>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameErr}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordErr}
              />
            </FormControl>
            {loginErr && (
              <FormControl>
                <Typography color="error">{loginErr}</Typography>
              </FormControl>
            )}
            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              sx={{ marginTop: "1rem" }}
              onClick={loginSubmit}
              loading={loading}
            >
              Sign in
            </LoadingButton>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Login;
