import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: "20px",
  },
}));

export default function CustomButton({ variant, color, children, ...rest }) {
  const classes = useStyles();
  return (
    <Button {...rest} variant={variant} color={color} className={classes.btn}>
      {children}
    </Button>
  );
}

CustomButton.defaultProps = {
  variant: "contained",
  color: "primary",
};

CustomButton.prototype = {
  variant: PropTypes.string,
  color: PropTypes.string,
};
