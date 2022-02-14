import React, { useState } from "react";
import {
  Button,
  ClickAwayListener,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {},
    menuItemIcon: {
      color: "#1F65A6",
    },
    listStyle: {
      border: "1px solid #4A5257",
      borderRadius: "5px",
      alignContent: "center",
    },
    listItemStyle: {},
    collapseSetting: {
      border: "1px solid #1F65A6",
    },
  })
);

export default function Dashboard({ history }) {
  const classes = useStyles();
  const [opendropdown, setOpendropdown] = useState(false);

  return (
    <Grid container>
      <Grid item sm={6} md={6} lg={3}>
        <h2 style={{ float: "left" }}>Dashboard</h2>
      </Grid>
      <Grid item xs={3} lg={7}></Grid>
      <Grid item sm={6} lg={2}>
        <ClickAwayListener onClickAway={() => setOpendropdown(false)}>
          <div>
            <Button
              fullWidth
              style={{ borderRadius: "20px" }}
              size='large'
              variant='contained'
              color='primary'
              onClick={() => setOpendropdown(!opendropdown)}
            >
              Create New
              {opendropdown ? (
                <IconExpandLess style={{ marginLeft: "5px" }} />
              ) : (
                <IconExpandMore style={{ marginLeft: "5px" }} />
              )}
            </Button>
            {opendropdown ? (
              <>
                <List className={classes.listStyle}>
                  <ListItem button onClick={() => history.push("/estimate")}>
                    <ListItemText primary='Estimate' />
                  </ListItem>
                  <Divider />
                  <ListItem button onClick={() => history.push("/invoice/add")}>
                    <ListItemText primary='Invoice' />
                  </ListItem>
                </List>
              </>
            ) : null}
          </div>
        </ClickAwayListener>
      </Grid>
    </Grid>
  );
}
