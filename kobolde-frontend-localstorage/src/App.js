import React from "react";
import "./App.css";
import AddProduct from "./components/My-Task-List";
import Addcategory from './components/My-Task-List/AddCategory';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";



import {

  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
function App() {
  const classes = useStyles();
  return (
    <Router>
     
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
         <Typography variant="h6" >
          
         </Typography>
         <IconButton  >
        
         <Link to="/"  style={{ textDecoration: 'none', color: 'white' ,fontSize:18}}>Home</Link>
         </IconButton>
         <IconButton color="inherit" >
         <Link to="/category" style={{ textDecoration: 'none', color: 'white' ,fontSize:18 }}>Kategori</Link>
         </IconButton>
         <IconButton color="inherit" >
         <Link to="/product" style={{ textDecoration: 'none', color: 'white',fontSize:18 }}>Produkt</Link>
         </IconButton>
         <IconButton color="inherit">
         <Link to="/productList" style={{ textDecoration: 'none', color: 'white' ,fontSize:18}}>Produkts</Link>
         </IconButton>
       </Toolbar>
     </AppBar>
     <Switch>
     <Route path="/category">
            <Category />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          
          <Route path="/">
            <Home />
          </Route>
        </Switch>
   
    </Router>
  );
}
function Home() {
  return <h2>Home</h2>;
}


function Category() {
  return <Addcategory />;
}
function Product() {
  return <AddProduct />;
}
export default App;
