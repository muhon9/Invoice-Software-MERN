import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
// creates a beautiful scrollbar

import { Drawer, makeStyles, Hidden, CssBaseline } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import SideMenu from "../components/Sidebar/SideMenu";
import Dashboard from "../pages/Dashboard/Dashboard";
import Invoices from "../pages/InvoicePages/Invoices";
import Estimate from "../pages/Estimate/Estimate";
import NewInvoice from "../pages/InvoicePages/NewInvoice";
import PDF from "../pages/PDF";
import SignUp from "../pages/AuthPages/SignUp";
import { logOut } from "../actions/userActions";

import CompanySettings from "../pages/Settings/CompanySettings";
import Navbar from "../components/Navbar/Navbar";
import Client from "../pages/ClientPages/Client";
import AddClient from "../pages/ClientPages/AddClient";
import ViewInvoice from "../pages/InvoicePages/ViewInvoice";
import UpdateInvoice from "../pages/InvoicePages/UpdateInvoice";

let ps;
const drawerWidth = 240;

const switchRoutes = (
  <Switch>
    <Route exact path='/dashboard' component={Dashboard} />
    <Route exact path='/invoice' component={Invoices} />
    <Route exact path='/invoice/:invoice_id/view' component={ViewInvoice} />
    <Route exact path='/invoice/:invoice_id/edit' component={UpdateInvoice} />
    <Route exact path='/estimate' component={Estimate} />
    <Route exact path='/customers' component={Client} />
    <Route exact path='/customer/add' component={AddClient} />
    <Route exact path='/company-settings' component={CompanySettings} />
    <Route exact path='/invoice/add' component={NewInvoice} />
    <Route exact path='/invoice/pdf' component={PDF} />
  </Switch>
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  type: {
    float: "right",
    [theme.breakpoints.up("sm")]: {},
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: "110vh",
    padding: theme.spacing(3),
  },
  toolIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  logo: {},
  img: {
    width: "200px",
    padding: "15px",
  },
}));

export default function LogedInLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  //redux store
  const loginUser = useSelector((state) => state.loginUser);
  const { loading, userInfo, error } = loginUser;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleLogout = () => {
    console.log("Logout");
    dispatch(logOut());
    history.push("/login");
  };

  return (
    <>
      {!userInfo ? (
        <div>Loading......</div>
      ) : (
        <div className={classes.root}>
          <CssBaseline />
          <Navbar
            handleLogout={handleLogout}
            handleDrawerToggle={handleDrawerToggle}
          />
          <nav className={classes.drawer}>
            <Hidden smUp implementation='css'>
              <Drawer
                className={classes.drawer}
                container={container}
                onClose={handleDrawerToggle}
                variant='temporary'
                anchor='left'
                open={mobileOpen}
              >
                <div className={classes.logo}>
                  <img src='/logo.jpg' alt='logo' className={classes.img} />
                </div>
                <SideMenu />
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation='css'>
              <Drawer
                className={classes.drawer}
                onClose={handleDrawerToggle}
                variant='permanent'
                anchor='left'
                open
              >
                <div className={classes.logo}>
                  <img src='/logo.png' alt='logo' className={classes.img} />
                </div>
                <SideMenu />
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {switchRoutes}
          </main>
        </div>
      )}
    </>
  );
}
