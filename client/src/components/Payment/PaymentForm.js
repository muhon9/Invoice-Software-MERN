import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import CustomButton from "../CustomComponents/CustomButton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  dialogForm: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(5),
    margin: "auto",
    //width: "fit-content",
  },
  dialogActions: {
    margin: theme.spacing(2),
  },
}));

export default function PaymentForm({
  todayDate,
  open,
  handleDialogClose,
  handleDialogSubmit,
  dialogValue,
  setDialogValue,
  success,
  setSuccess,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={handleDialogClose}>
        <form onSubmit={handleDialogSubmit} className={classes.dialogForm}>
          <DialogTitle id='form-dialog-title'>Record A Payment</DialogTitle>
          <Divider />
          <br />
          <FormControl
            fullWidth
            variant='outlined'
            className={classes.formControl}
          >
            <InputLabel margin htmlFor='amount'>
              Payment Date
            </InputLabel>
            <Input
              autoFocus
              margin='normal'
              id='paymentDate'
              defaultValue={todayDate}
              value={dialogValue.date}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  paymentDate: event.target.value,
                })
              }
              label='Payement Date'
              type='date'
            />
          </FormControl>

          <FormControl
            fullWidth
            variant='outlined'
            className={classes.formControl}
          >
            <InputLabel htmlFor='amount'>Payment</InputLabel>
            <Input
              margin='normal'
              variant='contained'
              id='amount'
              placeholder='0'
              value={dialogValue.amount}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  amount: event.target.value,
                })
              }
              startAdornment={
                <InputAdornment position='start'>BDT</InputAdornment>
              }
              label='Amount'
              type='number'
            />
          </FormControl>

          <br></br>
          <FormControl
            fullWidth
            variant='outlined'
            className={classes.formControl}
          >
            <InputLabel htmlFor='filled-age-native-simple'>Payment</InputLabel>
            <Select
              native
              size='small'
              label='Payment'
              value={dialogValue.method}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  method: event.target.value,
                })
              }
              inputProps={{
                name: "method",
                id: "filled-age-native-simple",
              }}
            >
              <option aria-label='None' value='' />
              <option value='cash'>Cash</option>
              <option value='bKash'>bKash</option>
            </Select>
          </FormControl>
          <TextField
            margin='normal'
            label='Notes'
            id='note'
            value={dialogValue.note}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                note: event.target.value,
              })
            }
            type='text'
          />

          {/* </DialogContent> */}
          <DialogActions>
            <Button onClick={handleDialogClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={success} onClose={handleDialogClose}>
        <DialogTitle>Record A Payment</DialogTitle>
        <Divider />
        <div className={classes.dialogForm}>
          <div style={{ margin: "0 auto" }}>
            <Icon>
              <CheckCircleOutlineIcon
                style={{ fontSize: "70", color: "#095910 " }}
              />
            </Icon>
          </div>
          <Typography variant='h4' align='center'>
            Payment Successfull
          </Typography>
        </div>
        <DialogActions className={classes.dialogActions}>
          <CustomButton
            variant='outlined'
            onClick={handleDialogClose}
            color='primary'
          >
            Cancel
          </CustomButton>
          <CustomButton type='submit' color='primary'>
            Send a notification
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
