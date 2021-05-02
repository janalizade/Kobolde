import React, { Component } from 'react';
import './Modal.css';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from './logo.png';
import { createStyles, WithStyles } from "@material-ui/core/styles";
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { lightGreen } from '@material-ui/core/colors'; 





import './Home.css';

class Modal extends Component {

    state = {
        persons: [],
      };
     
theme = createMuiTheme({
    palette: {
      primary: {
        main: '#007896'
      },
      secondary: {
        main: lightGreen[500]
      }
    }
  });

  componentDidMount() {
   alert(this.props);
    axios.get(`http://localhost:3000/api/users/`)
     .then(res => {
       console.log(res.data);
       const persons = res.data;
       this.setState({ persons });
     })
 }
  useStyles = makeStyles((theme) => ({
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

constructor(props) {
    super(props)
   
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeProdukt=this.onChangeProdukt.bind(this);
    this.onChangearbetstid=this.onChangearbetstid.bind(this);
    this.onChangearbetsGang=this.onChangearbetsGang.bind(this);

    
    this.state = {
        name: '',
        email: '',
        produkt:'',
        arbetstid:'',
        arbetsgang:''
    }
}

onChangeUserName(e) {
    this.setState({ name: e.target.value })
}

onChangeUserEmail(e) {
    this.setState({ email: e.target.value })
}

onChangeProdukt(e) {
  this.setState({ produkt: e.target.value })
}
onChangearbetstid(e) {
  this.setState({ arbetstid: e.target.value })
}
onChangearbetsGang(e) {
  this.setState({ arbetsgång: e.target.value })
}


  
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        
         
      
         if (this.props.open) {
            return null;
        }

        return (
            <main>
            <section>
            
             <div >
             <CssBaseline />
             
           
             <Table  >
              
              
             
               <TableHead >
               
               <TableRow>
                   <TableCell>Produkt </TableCell>
                   <TableCell >ArbetsTid1</TableCell>
                   <TableCell >GångTid1</TableCell>
                   <TableCell >Name</TableCell>
                   <TableCell >Email  </TableCell>
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
                <TableCell>      <Button variant="outlined" color="secondary"    onClick={(e) => this.deleteRow(person._id, e)}>Delete</Button> 
                 </TableCell>
                        
              
           
              
               
             
                       
               </TableRow>
             ))}
               </Table>
           
               </div>
               <p>Customer Name:{this.props.x} </p>; 
              
         </section>
          </main>  
        );
    }
}

export default Modal;