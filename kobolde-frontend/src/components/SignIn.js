import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from './logo.png';
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { lightGreen } from '@material-ui/core/colors';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007896'
    },
    secondary: {
      main: lightGreen[500]
    }
  }
});


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      color:green
    },
  }));
     
  const SignIn=({addItem})=> {
    const classes = useStyles();
    const[email,setEmail]=useState('');
    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(email);
       addItem(email);
      setEmail('');
    }
    return (
        
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div><br/><br/><br/> </div>
        <div className={classes.paper}>
            <img src={logo}/>
   
          <form  noValidate onSubmit={handleSubmit}>
          
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="GångsTid1"
              label="GångsTid M1"
              name="GångsTid1"
              autoFocus
            />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ArbetsTid1"
              label="ArbetsTid1"
              name="ArbetsTid1"
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
              value={email}
              autoFocus
              onChange={(e)=>setEmail(e.target.value)}
            />
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
           
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
           
          </form>
 
        </div>
       
      </Container>
     
    );
  }
export default  SignIn; 
