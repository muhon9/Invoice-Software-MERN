import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AdminNavbarLinks from "./AdminNavbarLinks";

const useStyles = makeStyles((theme) => ({
  appbar: {
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  companyname: {
    flexGrow: 1,
    float: "left",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const handleDrawerToggle = props;

  return (
    <AppBar className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.companyname}>Hello</Typography>
        <Hidden smDown implementation='css'>
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
