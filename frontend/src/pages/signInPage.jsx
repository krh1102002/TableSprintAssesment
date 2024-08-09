import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  ThemeProvider,
  createTheme,
} from "@mui/material";

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

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const {
    control: forgotPasswordControl,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors },
  } = useForm();

  useEffect(() => {
    if (user) {
      toast.success("Logged in successfully!");
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);

  const onSubmit = (data) => {
    let isValid = true;
    if (!data.email) {
      setError("email", { type: "manual", message: "Email is required" });
      toast.error("Email is required");
      isValid = false;
    }
    if (!data.password) {
      setError("password", { type: "manual", message: "Password is required" });
      toast.error("Password is required");
      isValid = false;
    }

    if (isValid) {
      dispatch(signIn(data));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  const onForgotPasswordSubmit = (data) => {
    // Implement password reset logic here
    console.log("Password reset requested for:", data.email);
    toast.success("Password reset link sent to your email");
    handleCloseForgotPassword();
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
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "Poppins, Arial, sans-serif",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 470,
            height: 550,
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
            left: "-13%",
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
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  placeholder="Enter Your Email"
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
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  placeholder="Enter Your Password"
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
            <Box sx={{ textAlign: "right", mt: 1, mb: 2 }}>
              <Button
                onClick={handleForgotPassword}
                style={{
                  color: "#6B21A8",
                  textDecoration: "none",
                  fontSize: 14,
                  fontFamily: "Poppins, Arial, sans-serif",
                  textTransform: "none",
                  padding: 0,
                }}
              >
                Forgot Password?
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#6B21A8",
                "&:hover": { bgcolor: "#581c87" },
                borderRadius: 1,
                py: 1.5,
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 500,
              }}
            >
              Log In
            </Button>
          </form>
        </Box>
      </Box>

      {/* Forgot Password Modal */}
      <Modal
        open={openForgotPassword}
        onClose={handleCloseForgotPassword}
        aria-labelledby="forgot-password-modal"
        aria-describedby="forgot-password-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            fontFamily: "Poppins, Arial, sans-serif",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 2,
              color: "#6B21A8",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Did you forget password?
          </Typography>
          <Typography sx={{ mb: 2, color: "#A9A9A9" }}>
            Enter your email address and we'll send you a link to restore
            password
          </Typography>
          <form
            onSubmit={handleForgotPasswordSubmit(onForgotPasswordSubmit)}
            noValidate
          >
            <Typography sx={{ mb: 2, color: "#A9A9A9", fontSize: "sm" }}>
              Email Address
            </Typography>
            <Controller
              name="email"
              control={forgotPasswordControl}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  error={!!forgotPasswordErrors.email}
                  helperText={forgotPasswordErrors.email?.message}
                  sx={{ mb: 2 }}
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
                mb: 2,
              }}
            >
              Request reset link
            </Button>
          </form>
          <Box sx={{ textAlign: "center" }}>
            <Button
              onClick={handleCloseForgotPassword}
              sx={{
                color: "#6B21A8",
                textTransform: "none",
                textDecoration: "underline",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Back to log in
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default SignIn;
