import React from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import logo from './logo.png';
import {
    Button,
    TextField,
    CircularProgress,
    Link,
    Box,
    Typography,
    Grid,
  } from "@material-ui/core";
  import { useForm, Controller } from "react-hook-form";
  import axios from 'axios';
  import ItemList from './ItemList';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(20),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(20),
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);


export default function Login(props) {
  const classes = useStyles();
  const { control, handleSubmit, errors, formState, reset  } = useForm({
    mode: "onChange",
  });
  const [open, setOpen] = React.useState(false);
  const[x,setX]=React.useState('');
  
  const show=()=>{
    setOpen(true);
  }
  const onSubmit = (data) => {
      setX(data.email);
    if (data) {
      let userObject = {
        email: data.email,
        name:data.name,
        produkt:data.produkt,
        arbetstid:data.arbetstid,
        arbetsgang:data.arbetsgang,
       
      };
      
      axios.post('http://localhost:3000/api/users', userObject)
      .then((res) => {
        //reset();
        debugger;
       
       console.log(res.data)
       
      }).catch((error) => {
          console.log(error)
      });
    
     // dispatch(authActions.login(loginUser));
    }
   
  };


  return (
    <div className={classes.root}>
      <Box mt={5} px={2}>
        <Grid container spacing={3}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper className={classes.paper}>
              <Typography variant="h3" gutterBottom>
              <img src={logo}/>
               </Typography>
              <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
              
              <Controller
                as={TextField}
                name="produkt"
                control={control}
                fullWidth
                variant="outlined"
                label="Produkt"
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.produkt && "¯"}
                error={errors.produkt && true}
              />
               <Controller
                as={TextField}
                name="arbetstid"
                control={control}
                fullWidth
                variant="outlined"
                label="ArbetsTider"
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.arbetstid && "¯"}
                error={errors.arbetstid && true}
               />
             
              <Controller
                as={TextField}
                name="arbetsgang"
                control={control}
                fullWidth
                variant="outlined"
                label="GångTid M1"
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.arbetsgang && "¯"}
                error={errors.arbetsgang && true}
               />
              <Controller
                as={TextField}
                name="name"
                control={control}
                fullWidth
                variant="outlined"
                label="Name"
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.name && "¯"}
                error={errors.name && true}
              />
              <Controller
                as={TextField}
                name="email"
                control={control}
                fullWidth
                variant="outlined"
                label="email"
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.email && "¯"}
                error={errors.email && true}
              />
                <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 className={classes.submit} >
                Skicka In
                </Button>
                
              </form>
              <Button
                 fullWidth
                 variant="contained"
                 color="primary"
                 className={classes.submit} onClick={show}>
                List
                </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    
     <ItemList open={open} data={x} />
     </div>
  )
}