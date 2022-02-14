import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
}));

export default function FormNewCustomerDialog({
  open,
  handleDialogClose,
  handleDialogSubmit,
  dialogValue,
  setDialogValue,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby='form-dialog-title'
      >
        <form onSubmit={handleDialogSubmit} className={classes.dialogForm}>
          <DialogTitle id='form-dialog-title'>Add a new Customer</DialogTitle>
          {/* <DialogContent> 
          <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText> */}
          <TextField
            autoFocus
            margin='normal'
            id='name'
            value={dialogValue.customerName}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                customerName: event.target.value,
              })
            }
            label='Customer Name'
            type='text'
          />
          <TextField
            margin='normal'
            id='name'
            value={dialogValue.customerNumber}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                customerNumber: event.target.value,
              })
            }
            label='Customer Number'
            type='text'
          />
          <TextField
            margin='normal'
            id='name'
            value={dialogValue.customerAddress}
            onChange={(event) =>
              setDialogValue({
                ...dialogValue,
                customerAddress: event.target.value,
              })
            }
            label='Customer Address'
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
    </div>
  );
}
