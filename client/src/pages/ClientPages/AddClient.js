import {
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { addClientsAction } from "../../actions/clientActions";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(8),
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddClient({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.addClient);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClientsAction(name, number, address));
    history.push("/customers");
  };

  return (
    <>
      <Grid container>
        <Grid item xs={7} sm={7} lg={4}>
          <Typography variant='h4' style={{ float: "left" }}>
            Add A Customer
          </Typography>
        </Grid>
        <Grid item xs={5} lg={8}></Grid>
      </Grid>
      <Container component='main' maxWidth='xs'>
        {error && <Alert severity='error'>{error}</Alert>}
        {success && <Alert severity='success'>Customer Added</Alert>}
        {loading && <div>Loading....</div>}
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            label='Customer Name'
            variant='outlined'
            margin='normal'
            fullWidth
            id='input-with-icon-textfield'
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label='Customer Number'
            variant='outlined'
            margin='normal'
            fullWidth
            id='input-with-icon-textfield'
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            label='Address'
            multiline
            rows='3'
            variant='outlined'
            margin='normal'
            fullWidth
            id='input-with-icon-textfield'
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}
