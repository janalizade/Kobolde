import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";
import { Link } from "react-router-dom";
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';

import { lightGreen } from '@material-ui/core/colors'; 
import CreateUser from './Input';
import SignIn from './SignIn';


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500]
  },
  customHeight: {
    minHeight: 200
  },
  offset: theme.mixins.toolbar
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           
          </Typography>
          <IconButton color="inherit" onClick={() => <CreateUser/>}>
           Create
          </IconButton>
          <IconButton color="inherit" onClick={() => <SignIn/>}>
            List
          </IconButton>
          <IconButton color="inherit" >
            Edit
          </IconButton>
         
          
        </Toolbar>
      </AppBar>
      <Toolbar />
      
      <Typography>
       
      </Typography>
    </React.Fragment>
  );
}
