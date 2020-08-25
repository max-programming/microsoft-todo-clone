import React, { useContext, useState } from "react";
import {
  TextField,
  Container,
  Paper,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const {
    handleLogin,
    handleSignup,
    emailError,
    passwordError,
    email,
    password,
    setEmail,
    setPassword,
    hasAccount,
    setHasAccount,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const linkStyle = {
    cursor: "pointer",
    color: "green",
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <section className="login" style={{ marginTop: 150 }}>
      <Container maxWidth="sm">
        <Paper variant="outlined" style={{ padding: 20 }}>
          <h1 style={{ textAlign: "center" }}>
            {hasAccount ? "Log in" : "Sign up"}
          </h1>
          {/* <Card variant="outlined"> */}
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <TextField
              label="Email"
              type="email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="errorMsg">{emailError}</p>
            <TextField
              label="Password"
              variant="filled"
              fullWidth
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <p className="errorMsg">{passwordError}</p>
            {hasAccount ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  fullWidth
                >
                  Log in
                </Button>
                {/* <button onClick={handleLogin}>Log in</button> */}
                <p style={{ userSelect: "none" }}>
                  Don't have an account?{" "}
                  <span
                    style={linkStyle}
                    onClick={() => setHasAccount(!hasAccount)}
                  >
                    Sign up
                  </span>
                </p>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignup}
                  fullWidth
                >
                  Sign up
                </Button>
                <p style={{ userSelect: "none" }}>
                  Have an account?{" "}
                  <span
                    style={linkStyle}
                    onClick={() => setHasAccount(!hasAccount)}
                  >
                    Login
                  </span>
                </p>
              </>
            )}
          </div>
        </Paper>
        {/* </Card> */}
      </Container>
    </section>
  );
};

export default Login;
