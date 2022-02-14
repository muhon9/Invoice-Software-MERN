import { Button, Grid } from "@material-ui/core";
import React from "react";
import InvoiceLists from "../../components/Invoice/InvoiceLists";

export default function Invoices({ history }) {
  return (
    <>
      <Grid container>
        <Grid item lg={3}>
          <h2 style={{ float: "left" }}>Invoices</h2>
        </Grid>
        <Grid item xs={3} lg={7}></Grid>
        <Grid item sm={3} lg={2}>
          <Button
            fullWidth
            style={{ borderRadius: "20px" }}
            size='large'
            variant='contained'
            color='primary'
            onClick={() => history.push("/invoice/add")}
          >
            Create New
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          height: "100px",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #4A5257",
        }}
      >
        <Grid item xs={4} sm={4} md={4} lg={4}>
          Total Due
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          Total Invoices
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          Income
        </Grid>
      </Grid>

      <Grid container>
        <InvoiceLists />
      </Grid>
    </>
  );
}
