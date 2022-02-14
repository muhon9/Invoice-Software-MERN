import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { getUserAction, updateUser } from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CompanySettings = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.loginUser);
  const { userInfo } = loginUser;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const updatedUser = useSelector((state) => state.updateUser);
  const { success } = updatedUser;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.email) {
        dispatch(getUserAction("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, user, dispatch, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password doesn't match");
    } else {
      setMessage("");
      dispatch(updateUser({ name, email, password }));
      setName(user.name);
      setEmail(user.email);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          User Details
        </Typography>
        {error && <Alert severity='error'>{error}</Alert>}
        {message && <Alert severity='error'>{message}</Alert>}
        {success && <Alert severity='success'>Update Successful</Alert>}
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                value={name}
                required
                fullWidth
                id='name'
                label='Name'
                name='Name'
                onChange={(e) => setName(e.target.value)}
                autoComplete='name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                variant='outlined'
                fullWidth
                name='password'
                label='Update Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={confirmPassword}
                variant='outlined'
                fullWidth
                name='confirmPassword'
                label='ConfirmPassword'
                type='password'
                id='confirmPassword'
                autoComplete='current-password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Update Info
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CompanySettings;
