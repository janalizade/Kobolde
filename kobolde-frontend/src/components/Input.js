import React, { Component, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from './logo.png';
import axios from 'axios';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { lightGreen } from '@material-ui/core/colors'; 
import Modal from './ListModal';

import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import ImageUpload from './ImageUpload';
import ReactDOM from 'react-dom';


export default class CreateUser extends Component {
  state = {
    open: true}
  state = {
  activeItemEmail: ""}

  openModal = (e) => {
  
    this.setState({
        open: !this.state.open
    });
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
      marginTop: theme.spacing(18),
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
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            name: '',
            email: '',
            produkt:'',
            arbetstid:'',
            arbetsgang:'',
            slotInfo :''
        }
    }
  ImageUpload(){
    [...document.querySelectorAll('.image_upload')].map(item => {
      ReactDOM.render(<ImageUpload position={item.getAttribute('data-position')}
        imageId={item.getAttribute('data-id') ? item.getAttribute('data-id') : ''}
        imageUrl={item.getAttribute('data-url') ? item.getAttribute('data-url') : ''}
        maxWidth={item.getAttribute('data-width') ? item.getAttribute('data-width') : ''}
    
        apiUrl={item.getAttribute('data-apiurl')}
         />, item);
    })

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
      this.setState({ arbetsgang: e.target.value })
   }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            name: this.state.name,
            email: this.state.email,
            produkt:this.state.produkt,
            arbetstid:this.state.arbetstid,
            arbetsgang:this.state.arbetsgang
        };
       
        this.setState({activeItemEmail:this.state.email});
       
        axios.post('http://localhost:3000/api/users', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        
        this.setState({ name: '', email: '',produkt:'',arbetstid:'',arbetsgang:'' });
      
        
    }


    render() {
      
        return (
     <main>
     <section>
         
      
          <Container component="main" maxWidth="xs">
           
            <div><br/><br/><br/><br/><br/> </div>
            <div className={this.useStyles.paper}>
            <img src={logo}/>
     <form onSubmit={this.onSubmit}  >
      
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="produkt"
            label="Produkt"
            name="produkt"
            autoFocus
            value={this.state.produkt} 
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
            value={this.state.arbetstid} 
            onChange={this.onChangearbetstid}
          />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="arbetsgang"
            label="GångTid M1"
            name="arbetsgang"
            autoFocus
            value={this.state.arbetsgang} 
            onChange={this.onChangearbetsGang}
          />
        
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={this.state.name} 
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
            value={this.state.email} 
           />
         
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <div className="form-group">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.useStyles.submit}
          
          >
            Skicka In
          </Button>
         <Button  variant="outlined"  color="primary" onClick={() => this.openModal()}>Edit</Button>  
         <Button  variant="outlined"  color="primary" onClick={() => this.ImageUpload()}>Image</Button>  
         </div>
       
         </form> 
      
          </div>
         
                </Container>
                <Modal open={!this.state.open} onClose={this.openModal} x={this.state.email}/>
              </section>

        
        





             
   </main>  
         
        )
    }
}