// ** create-user.component.js ** //

import React, { Component, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import axios from 'axios';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { lightGreen } from '@material-ui/core/colors'; 



export default class CreateUser extends Component {
  
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
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            name: '',
            email: '',
            produkt:'',
            arbetstid:'',
            arbetsGång:''
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
      this.setState({ arbetsGång: e.target.value })
   }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            name: this.state.name,
            email: this.state.email,
            produkt:this.state.produkt,
            arbetstid:this.state.arbetstid,
            arbetsGång:this.state.arbetsGång
        };

        axios.post('http://localhost:3000/api/users', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', email: '',produkt:'',arbetstid:'',arbetsGång:'' })
    }


    render() {
      
        return (
      
          
         

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={this.useStyles.paper}>
            <img src={logo}/>
                <form onSubmit={this.onSubmit} className={this.useStyles.form} >
                <ThemeProvider theme={this.theme}>

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
            id="arbetsgånger"
            label="GångTid M1"
            name="arbetsgånger"
            autoFocus
            value={this.state.arbetsGång} 
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
            Submit
          </Button>
                    </div>
                    </ThemeProvider>
                </form>
          </div>
                </Container>
            
        )
    }
}
