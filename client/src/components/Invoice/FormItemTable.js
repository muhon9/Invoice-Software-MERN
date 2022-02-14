import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  IconButton,
  Button,
  Divider,
  Typography,
  TextField,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

export default function FormItemTalbe({
  items,
  setItems,
  handleItemChange,
  handleRemove,
  subTotal,
  setSubTotal,
}) {
  const classes = useStyles();

  const addNewItemRow = (e) => {
    e.preventDefault();
    const value = [
      ...items,
      {
        itemName: "",
        itemDescription: "",
        itemQuantity: null,
        itemPrice: null,
        total: 0,
      },
    ];
    setItems(value);
  };

  return (
    <div>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>SN</TableCell>
            <TableCell align='right'>Item</TableCell>
            <TableCell align='right'>Description</TableCell>
            <TableCell align='right'>Quantity</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Total</TableCell>

            <TableCell align='right'>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow>
              <TableCell component='th' scope='row'>
                <Typography variant='h6'>#{index + 1}</Typography>
              </TableCell>

              <TableCell align='right'>
                <TextField
                  variant='outlined'
                  size='small'
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                  name='itemName'
                  className='form-control'
                  placeholder='Enter item name'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  autoFocus
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  variant='outlined'
                  size='small'
                  multiline
                  name='itemDescription'
                  // rows={textAreaRows}
                  // onKeyPress={(e) => {
                  //   e.key === "Enter" && setTextAreaRows(textAreaRows + 1);
                  // }}
                  className='form-control'
                  placeholder='Descriptions'
                  value={item.itemDescription}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  variant='outlined'
                  size='small'
                  placeholder='Quantity'
                  multiline
                  style={{ textAlign: "right" }}
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                  name='itemQuantity'
                  className='form-control'
                  value={item.itemQuantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
              </TableCell>
              <TableCell align='right'>
                <TextField
                  variant='outlined'
                  size='small'
                  placeholder='Price'
                  multiline
                  style={{ textAlign: "right" }}
                  name='itemPrice'
                  className='form-control'
                  value={item.itemPrice}
                  onChange={(e) => handleItemChange(index, e)}
                  onKeyPress={(e) => {
                    e.key === "Enter" && addNewItemRow(e);
                  }}
                  required
                />
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6'>
                  ${item.itemPrice * item.itemQuantity}{" "}
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='delete'
                  type='button'
                  onClick={() => handleRemove(index)}
                  color='primary'
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <table className='table'>
        <thead className='thead-light'>
          <tr className='row'>
            <th scope='col' className='col-md-1'>
              SN
            </th>
            <th scope='col' className='col-md-3'>
              Item
            </th>
            <th scope='col' className='col-md-4'>
              Descriptions
            </th>
            <th scope='col' className='col-md-1'>
              Quantity
            </th>
            <th scope='col' className='col-md-1'>
              Price
            </th>
            <th scope='col' className='col-md-2'>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className='row'>
              <td className='col-md-1'></td>
              <td className='col-md-3'>
                <input
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                  name='itemName'
                  className='form-control'
                  placeholder='Enter item name'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e)}
                  autoFocus
                  required
                />
              </td>
              <td className='col-md-4'>
                <textarea
                  name='itemDescription'
                  rows={textAreaRows}
                  onKeyPress={(e) => {
                    e.key === "Enter" && setTextAreaRows(textAreaRows + 1);
                  }}
                  className='form-control'
                  placeholder='Descriptions'
                  value={item.itemDescription}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </td>
              <td className='col-md-1'>
                <input
                  style={{ textAlign: "right" }}
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                  name='itemQuantity'
                  className='form-control'
                  value={item.itemQuantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                />
              </td>
              <td className='col-md-1'>
                <input
                  style={{ textAlign: "right" }}
                  name='itemPrice'
                  className='form-control'
                  value={item.itemPrice}
                  onChange={(e) => handleItemChange(index, e)}
                  onKeyPress={(e) => {
                    e.key === "Enter" && addNewItemRow(e);
                  }}
                  required
                />
              </td>
              <td className='col-md-2'>
                <div className='row'>
                  <h6 className='col-md-7 pt-2' style={{ textAlign: "right" }}>
                    ${item.itemPrice * item.itemQuantity}{" "}
                  </h6>
                  <div className='col-md-5 pb-3 pr-2'>
                    <IconButton
                      aria-label='delete'
                      type='button'
                      onClick={() => handleRemove(index)}
                      color='primary'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Divider />
      <Button
        size='large'
        color='primary'
        fullWidth
        type='button'
        startIcon={<AddCircleOutlineIcon />}
        onClick={addNewItemRow}
      >
        Add an item
      </Button>
      <Divider />
      <br />
    </div>
  );
}
