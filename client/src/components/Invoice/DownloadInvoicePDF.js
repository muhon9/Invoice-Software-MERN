import React from "react";
import {
  Page,
  View,
  Text,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles
const classes = StyleSheet.create({
  root: {
    margin: "auto",
    marginTop: "50px",
  },
  container: {
    boxSizing: "borderBox",
    margin: "0 auto",
    height: "1022px",
    width: "818px",
  },

  invoiceHeader: {
    margin: "0 25px",
    marginTop: "50px",
    height: "200px",
    display: "flex",
    justifyContent: "space-between",
  },

  logoimg: {
    width: "300px",
    height: "50px",
  },
  secondHeader: {
    margin: "0 25px",
    marginTop: "15px",
    height: "180px",
    display: "flex",
    justifyContent: "space-between",
  },
  tableHead: {
    fontColor: "#D41A1D",
    backgroundColor: "#D41A1D",
    height: "15px",
  },
});

const company = {
  name: "ArrowNet",
  address: "4th Floor, Abid Mansion , Zindabazar",
  number: "01760881213",
  website: "www.arrownetsylhet.com",
};

export default function DownloadInvoicePDF({ invoice }) {
  return (
    <Document>
      <Page size='A4'>
        <View style={classes.invoiceHeader}>
          <Image src='/logo.png' style={classes.logoimg} alt='logo' />
          <View>
            <View>
              <Text variant='h4' align='right'>
                INVOICE
              </Text>
              <Text variant='subtitle1' align='right'>
                {company.name}
              </Text>
              <Text paragraph align='right'>
                {company.address} Sylhet,Bangladesh
              </Text>
              <Text paragraph align='right'>
                Mobile: {company.number} {company.website}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
