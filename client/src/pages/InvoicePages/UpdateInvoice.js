import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Grid } from "@material-ui/core";
import InvoiceForm from "../../components/Invoice/InvoiceForm";
import InvoiceUpdateForm from "../../components/Invoice/InvoiceUpdateForm";
import { singleInvoiceAction } from "../../actions/invoiceActions";

export default function UpdateInvoice({ history, match }) {
  const dispatch = useDispatch();
  const { invoice_id } = match.params;
  const { loading, success, error, invoice } = useSelector(
    (state) => state.singleInvoice
  );

  useEffect(() => {
    dispatch(singleInvoiceAction(invoice_id));
  }, [invoice_id]);

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
        <InvoiceUpdateForm oldInvoice={invoice} />
      </Grid>
    </Container>
  );
}
