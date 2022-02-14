export const addInvoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_INVOICE_REQUEST_SEND":
      return { loading: true };
    case "ADD_INVOICE_REQUEST_SUCCESS":
      return { loading: false, success: true, invoice: action.payloads };
    case "ADD_INVOICE_REQUEST_FAIL":
      return { loading: false, error: action.payloads };
    default:
      return state;
  }
};

export const listInvoicesReducer = (state = {}, action) => {
  switch (action.type) {
    case "LIST_INVOICE_REQUEST_SEND":
      return { loading: true };
    case "LIST_INVOICE_REQUEST_SUCCESS":
      return {
        loading: false,
        success: true,
        totalInvoices: action.payloads.totalInvoices,
        invoices: action.payloads.invoices,
      };
    case "LIST_INVOICE_REQUEST_FAIL":
      return { loading: false, error: action.payloads };
    default:
      return state;
  }
};

//we will use it to get single invoice data using invoiceid for invoiceview and edit data
export const singleInvoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case "SINGLE_INVOICE_REQUEST_SEND":
      return { loading: true };
    case "SINGLE_INVOICE_REQUEST_SUCCESS":
      return {
        loading: false,
        success: true,
        invoice: action.payloads,
      };
    case "SINGLE_INVOICE_REQUEST_FAIL":
      return { loading: false, error: action.payloads };
    default:
      return state;
  }
};
