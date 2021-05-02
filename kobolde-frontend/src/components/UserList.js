import { withStyles } from "@material-ui/core/styles";
import React,{Component} from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline'
import Icon from '@material-ui/core/Icon';
import './Home.css';
import {
    TextField,
  CircularProgress,
  Link,
  Box,
  Typography,
  Grid,
} from "@material-ui/core";
import Modal from './Modal';


const styles = theme => ({
 
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  Table: {
    width: '100%',
    backgroundColor: 'orange',
    maxWidth: 1800,
    marginTop:350,
  },
  button: {
    margin: theme.spacing(1),
  },
});



class TableList extends Component {
   
  state = {
    number: ''
  }

  
  state = {
    open: false}
  state = {
    
    activeItemName : "", 
    activeProdukt: "", 
    activeArbetstid: "",
    activeArbetsgång: "" ,
    activeName: "", 
    activeEmail: "",
    activeId:"",
    searchItem:"",
        };
        state = {
          persons: [],
        };
       
openModal = (e) => {
    e.preventDefault();
    this.setState({
        open: !this.state.open
    });
};



openModalWithItem(person) {
  
  this.setState({
    open: !this.state.open,
     openDeleteModal: true,
     activeItemName: person.name,
     activeProdukt: person.produkt,
     activeArbetstid: person.arbetstid,
     activeArbetsgang: person.arbetsgang ,
     activeName: person.name, 
     activeEmail:person.email,
     activeId:person._id  
  })
      
}


  componentDidMount() {
     axios.get(`http://localhost:3000/api/users`)
      .then(res => {
        console.log(res.data);
        const persons = res.data;
        this.setState({ persons });
      })
  }
 searchrow(){  
  axios.get(`http://localhost:3000/api/users/email/${this.state.searchItem}`)  
    .then(res => {  
     const persons = this.state.persons.filter(item => item.email == res.data.user.email);  
     this.setState({ persons });  
    // console.log(persons);
   })  
   
}  

  deleteRow(id, e){  
   axios.delete(`http://localhost:3000/api/users/${id}`)  
     .then(res => {  
      console.log(res);  
      console.log(res.data);  
      //debugger;
      const persons = this.state.persons.filter(item => item._id !== id);  
      this.setState({ persons });  
    })  
    
}  


  render() {
    const { classes } = this.props;
    const {activeItemEmail}= this.props;
   
    return (
      <main>
     <section>
      <div className={classes.form}>
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="SearchItem"
            label="Enter Email address for search "
            name="SearchItem"
            autoFocus
            value={this.state.searchItem} 
            onChange={e => this.setState({searchItem: e.target.value})}
             
          />
          
       <Button  variant="outlined"  className={classes.submit}color="primary"onClick={() => this.searchrow()} >Search</Button>  
      <CssBaseline />
      
    
      <Table  className={classes.root}>
       
       
      
        <TableHead className={classes.Table}>
        
        <TableRow>
        <TableCell>Produkt</TableCell>
            <TableCell >ArbetsTid1</TableCell>
            <TableCell >GångTid1</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Id</TableCell>
            <TableCell >Action</TableCell>
          </TableRow>

          </TableHead>

          { this.state.persons.map(person =>(
            
         <TableRow>
         <TableCell>{person.produkt}</TableCell>
         <TableCell>{person.arbetstid}</TableCell>
         <TableCell>{person.arbetsgang}</TableCell>
         <TableCell>{person.name}</TableCell>
         <TableCell>{person.email}</TableCell>
         
         <TableCell>{person._id}</TableCell>
       
      
      <Button variant="outlined" className={classes.submit}color="secondary"    onClick={(e) => this.deleteRow(person._id, e)}>Delete</Button>  
      
      <Button  variant="outlined"  className={classes.submit}color="primary" onClick={() => this.openModalWithItem(person)}>Edit</Button>  
       
       <td>   
      
          
            </td>       
        </TableRow>
      ))}
        </Table>
    
        </div>
              
        <Modal open={!this.state.open} onClose={this.openModal}  activeItemName={this.state.activeItemName}    activeProdukt= {this.state.activeProdukt}  activeArbetstid={this.state.activeArbetstid}
      activeArbetsgang={this.state.activeArbetsgang }    activeName= {this.state.activeName }     activeEmail={this.state.activeEmail} activeId={this.state.activeId}/>
  </section>
   </main>  
    );
    
}

}
export default withStyles(styles)(TableList);