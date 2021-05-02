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
    this.onChangearbetsGång=this.onChangearbetsGång.bind(this);

    
    this.state = {
        name: '',
        email: '',
        produkt:'',
        arbetstid:'',
        arbetsgång:'',
        id:''
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
onChangearbetsGång(e) {
  this.setState({ arbetsgång: e.target.value })
}



updateRecord(id,activeProdukt,activeArbetstid,activeArbetsgång,activeItemName,activeEmail, e){  
    const userObject = {
        name: this.state.name,
        email: this.state.email,
        produkt:this.state.produkt,
        arbetstid:this.state.arbetstid,
        arbetsGång:this.state.arbetsgång
        
    };
 
    
    

axios.put(`http://localhost:3000/api/users/${id}`,userObject)  
.then((res) => {
    console.log(res.data)
}).catch((error) => {
    console.log(error)
});
   
}

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        
         const {activeProdukt}= this.props;
         const {activeArbetstid}= this.props;
         const {activeArbetsgång}= this.props;
         const {activeItemName}= this.props;
         const {activeEmail}= this.props;
         const {activeId}=this.props;
        
      
         if (this.props.open) {
            return null;
        }

        return (
          <section className="modal-container" id="modal">
          <div className="modal-content">
            
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={this.useStyles.paper}>
            <img src={logo}/>
   
          
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="produkt"
            label="Produkt"
            name="produkt"
            defaultValue={activeProdukt}
          
            onChange={this.onChangeProdukt}
             
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="arbetstider"
            label="ArbetsTid1"
            name="arbetstider"
            autoFocus
            defaultValue={activeArbetstid}
            onChange={this.onChangearbetstid}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="arbetsgång"
            label="GångTid M1"
            name="arbetsgång"
            autoFocus
            defaultValue={activeArbetsgång} 
            onChange={this.onChangearbetsGång}
          />
        
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            defaultValue={activeItemName}
            onChange={this.onChangeUserName}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChangeUserEmail}
            defaultValue={activeEmail} 

           />
         
          </div>
                </Container>   

                <td>  
      <Button variant="outlined" color="primary"    onClick={(e) => this.updateRecord(activeId,activeProdukt,activeArbetstid,activeArbetsgång,activeItemName,activeEmail, e)}>Update</Button>  
      
   
       </td>  
         
       
       <td></td>
       <td>  
       <Button variant="outlined" color="secondary"    onClick={this.onClose}>Cancel</Button>
        </td>            
                    </div>
            </section>
        );
    }
}

export default Modal;