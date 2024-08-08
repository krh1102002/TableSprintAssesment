import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  TextField,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { signUp, clearError } from "../redux/actions/userActions";
import { useForm, Controller } from "react-hook-form";
import LoginBackgroundImage from "../assets/images/login_back_image.png";
import Logo from "../assets/images/logo.png";

// Import Poppins font
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

// Create a theme with Poppins as the main font
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Poppins'), local('Poppins-Regular'), url('@fontsource/poppins/files/poppins-latin-400-normal.woff2') format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      toast.success("Registration Successful");
      navigate("/signin");
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [user, error, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(signUp(data, navigate));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `url(${LoginBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "Poppins, Arial, sans-serif",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
            left: "-20%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img
              src={Logo}
              alt="TableSprint"
              style={{ width: "70%", height: "auto" }}
            />
          </Box>
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            mb={3}
            sx={{ fontFamily: "Poppins, Arial, sans-serif" }}
          >
            Welcome to TableSprint admin
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Name is required",
                minLength: {
                  value: 8,
                  message: "Name must be at least 8 characters long",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  placeholder="Enter your name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                  sx={{ fontFamily: "Poppins, Arial, sans-serif" }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                validate: {
                  validFormat: (value) =>
                    /^\S+@\S+\.\S+$/.test(value) || "Invalid email format",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  placeholder="Enter your email address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                  sx={{ fontFamily: "Poppins, Arial, sans-serif" }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
                validate: {
                  isComplex: (value) => {
                    const errors = [];
                    if (!/[A-Z]/.test(value)) errors.push("uppercase letter");
                    if (!/[a-z]/.test(value)) errors.push("lowercase letter");
                    if (!/\d/.test(value)) errors.push("number");
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                      errors.push("special character");
                    return (
                      errors.length === 0 || `Include ${errors.join(", ")}`
                    );
                  },
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                  sx={{ fontFamily: "Poppins, Arial, sans-serif" }}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#6B21A8",
                "&:hover": { bgcolor: "#581c87" },
                borderRadius: 1,
                py: 1.5,
                mt: 2,
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 500,
              }}
            >
              Sign Up
            </Button>
            {/* <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link
                to="/signin"
                style={{
                  color: "#6B21A8",
                  textDecoration: "none",
                  fontSize: 14,
                  fontFamily: "Poppins, Arial, sans-serif",
                }}
              >
                Already Have an Account? Sign in
              </Link>
            </Box> */}
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
