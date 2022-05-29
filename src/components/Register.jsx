import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import registerUser from "../api/post/registerUser";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../redux/actions/user";

const Register = () => {
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const lang = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (firstName && lastName && email && password) {
      try {
        const res = await registerUser({
          firstName,
          lastName,
          email,
          password,
        });
        dispatch(setUserAction(res));
      } catch (error) {
        const { text } = JSON.parse(error?.message);
        setError(text);
      }
    } else {
      setError("Please provide valid data");
    }
  };

  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          {lang === 'gr' ? 'Εγγραφη' : 'Sign up'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                type="text"
                required
                fullWidth
                id="firstName"
                label={lang === 'gr' ? 'Ονομα' : "First Name"}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label={lang === 'gr' ? 'Επωνυμο' : "Last Name"}
                name="lastName"
                type="text"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={Boolean(error)}
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={() => setError(null)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={lang === 'gr' ? 'Κωδικος' : "Password"}
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "secondary.light" }}
          >
            {lang === 'gr' ? 'Εγγραφη' : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                {lang === 'gr' ? 'Εχετε ηδη λογαριασμο; Συνδεθειτε' : 'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
