
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/styles";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
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
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo from './logo.png';
import axios from 'axios';


const useStyles = makeStyles({
    paper: {
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open,data } = props;

  React.useEffect(() => {
   console.log('dialog',data);
  },[]);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
       
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const[data,setData]=React.useState([]);
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
 
  


  const handleClickOpen = () => {
/*    axios.get(`http://localhost:3000/api/users/`).then(response => {
           const resData = response.data;
              
            //status: response.status,
            setData(resData); 
       
    }).catch((error) => {
        if (error.message.toLowerCase() === 'network error') {              
          this.setStateWithError(-1, {});
        }
       
    });*/    
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
      <br />
      <Container component="main" maxWidth="xs">
           
           
            <div className={classes.paper}>
            <img src={logo}/>
     <form   >
      
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="produkt"
            label="Produkt"
            name="produkt"
            autoFocus
           
             
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
           
          />
        
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
           
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
           onClick={handleClickOpen}
          //  onClick={()=>alert('hi')} 
          >
            Skicka In
          </Button>
        
       
         </div>
       
         </form> 
      
          </div>
         
     </Container>
      <SimpleDialog data={data} open={open} onClose={handleClose} />
    </div>
  );
}
