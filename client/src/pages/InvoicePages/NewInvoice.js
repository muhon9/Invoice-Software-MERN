import React from "react";
import { Button, Container, Grid } from "@material-ui/core";
import InvoiceForm from "../../components/Invoice/InvoiceForm";

export default function NewInvoice() {
  return (
    <Container>
      <Grid container>
        <Grid item lg={3}>
          <h2 style={{ float: "left" }}>New Invoice</h2>
        </Grid>
        <Grid item xs={3} lg={7}></Grid>
        <Grid item sm={3} lg={2}>
          <Button
            fullWidth
            style={{ borderRadius: "20px" }}
            size='large'
            variant='contained'
            color='primary'
          >
            Preview
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <InvoiceForm />
      </Grid>
    </Container>
  );
}
