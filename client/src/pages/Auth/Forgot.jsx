import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { forgotpasswordvalidations } from "./validations";
import axios from "axios";
import { paperStyle } from "./AuthStyles";

export const Forgot = () => {
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotpasswordvalidations,
    onSubmit: async ({ email }) => {
      try {
        const response = await axios.post("/api/webuser/forgot", { email });
        console.log(response.data);
        alert("Password reset email sent successfully.");
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again later.");
      }
    },
  });

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid textAlign="center" marginBottom={2}>
          <Typography variant="h5" fontWeight="bold">
            Forgot Password
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            variant="standard"
            placeholder="Enter your email"
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <Grid marginTop={3}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};
