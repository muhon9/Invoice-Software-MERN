import React, { useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";

//material ui conponents
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
//material ui icons
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import IconDashboard from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import sidebarStyle from "../../assets/jss/arrow-invoice/components/sidebarStyle";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appMenu: { width: "100%" },
  navList: { width: drawerWidth },
  menuItem: {
    width: drawerWidth,
  },
  menuItemIcon: {
    color: "#1F65A6",
  },
  logoImage: {
    width: "100%",
  },
}));

export default function SideMenu(props) {
  const classes = useStyles();
  const [sub1, setSub1] = React.useState(false);
  const [sub2, setSub2] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState(null);
  const history = useHistory();

  function handleSelcted(event, index, path) {
    setSelectedMenu(index);
    history.push(`${path}`);
  }

  const handleClickOne = () => {
    // console.log("This is clicked", set);
    setSub1(!sub1);
    // if(openCollapse.includes(set)){
    //   var filtered= openCollapse.filter((item)=>{return  item!==set})
    //   console.log("Trigerd double entry", filtered);
    //   setOpenCollapse(filtered);
    // }else{
    //   openCollapse.push(set);
    //   setOpenCollapse(openCollapse);
    // }
  };

  const handleClickTwo = () => {
    setSub2(!sub2);
  };

  return (
    <div>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        className={classes.appMenu}
        disablePadding
      >
        <ListItem
          className='{classes.menuItem}'
          button
          key='1'
          selected={selectedMenu === 1}
          ad='/dashboard'
          onClick={(event) => handleSelcted(event, 1, "/dashboard")}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <IconDashboard />
          </ListItemIcon>
          <ListItemText
            className='MuiListItemText-primary'
            primary='Dashboard'
          />
        </ListItem>

        <ListItem
          button
          key='set2'
          onClick={handleClickOne}
          className={classes.menuItem}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <IconDashboard />
          </ListItemIcon>
          <ListItemText primary='Sales' />
          {sub1 ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>
        <Collapse in={sub1} timeout='auto' unmountOnExit>
          <Divider />
          <List component='div' disablePadding>
            <ListItem
              button
              className={classes.menuItem}
              key='4'
              selected={selectedMenu === 4}
              onClick={(event) => handleSelcted(event, 4, "/estimate")}
            >
              <ListItemText inset primary='Estimate' />
            </ListItem>
            <ListItem
              button
              className={classes.menuItem}
              key='5'
              selected={selectedMenu === 5}
              onClick={(event) => handleSelcted(event, 5, "/invoice")}
            >
              <ListItemText inset primary='Invoice' />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          button
          key='set1'
          onClick={handleClickTwo}
          className={classes.menuItem}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Settings' />
          {sub2 ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse
          in={sub2}
          timeout='auto'
          className='MuiCollapse-container'
          unmountOnExit
        >
          <Divider />
          <List component='div' disablePadding>
            <ListItem
              button
              className={classes.menuItem}
              key='2'
              selected={selectedMenu === 2}
              onClick={(event) => handleSelcted(event, 2, "/company-settings")}
            >
              <ListItemText inset primary='Company Settings' />
            </ListItem>

            <ListItem
              button
              className={classes.menuItem}
              key='3'
              selected={selectedMenu === 3}
              onClick={(event) => handleSelcted(event, 3, "/users")}
            >
              <ListItemText inset primary='Users' />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
}
