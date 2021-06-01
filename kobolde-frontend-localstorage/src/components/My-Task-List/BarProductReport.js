import React,{ useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { makeStyles, createStyles,withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import logo from '../My-Task-List/kobolde-logo.png';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TableContainer from '@material-ui/core/TableContainer';
import Container from '@material-ui/core/Container';
import DetailsIcon from '@material-ui/icons/Details';
import EditIcon from '@material-ui/icons/Edit';
import {
    Button,
    TextField,
    Box,
    Typography,
    Grid,
  } from "@material-ui/core";
  import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
const data1 = {
 
  labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
  datasets: [
    {
      label: '# of Red Votes',
      data: [ 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Blue Votes',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    {
      label: '# of Green Votes',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};
const useStyles = makeStyles((theme) =>
  createStyles({
paper: {
  marginTop: theme.spacing(3),
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
  marginTop: theme.spacing(3),
},
Table: {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
 },
submit: {
  margin: theme.spacing(3, 0, 2),
},
}));

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
};

export default function BarProductReport(props) {
  const classes = useStyles();
  const { control, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });
 const [data, setData] = useState([]);
 const [categoryId,setCategoryId]=useState([]);
 const[categoryTitle,setCategoryTitle]=useState([]);
 let title = [];
 let id=[];
 let titleproducts=[];

 const onSubmit=(data)=>{
 
  /*
  axios.get(`http://localhost:8000/api/v1/admin/categoryx/${data.title}`).then(res=>{
  const categories=res.data;
  setCategoryId(categories[Object.keys(categories)]._id);
  });

  */
  https://kobolde.ahoora.se:8443/api/v1/admin/productx/${data.title}
   
  //axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/productx/${data.title}`)  .then(res=>{
    axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/product/`)  .then(res=>{
    const categories=res.data;
    
    
       categories.forEach(element => {
         
        title.push(element.title);
        id.push(element[Object.keys(element)[0]].length); 
       
      });
    setData({
      Data: {
        labels: title,
        datasets: [
          {
            label: "IPL 2018/2019 Top Run Scorer",
            data:id,
            backgroundColor: [
              "#3cb371",
              "#0000FF",
              "#9966FF",
              "#4C4CFF",
              "#00FFFF",
              "#f990a7",
              "#aad2ed",
              "#FF00FF",
              "Blue",
              "Red"
            ]
          }
        ]
      }
    });

    });

}

 


return(
 
  <div>
  <CssBaseline />
  <div className={classes.paper}>
  
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
      <Grid container spacing={3}>
      <Grid item xs={12}>
        <Controller
             control={control}
             name="title"
             defaultValue=""
             render = {({ field})=> (
              <TextField
              {...field}
                 fullWidth
                 variant="outlined"
                  label="Kategori"
                  required
              />
              )}
            />  
        </Grid>
       </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
       Produkt Raport
      </Button>
      </form>
    </div>
    
    <>
    <div className='header'>
    <Typography component="h1" variant="h5">
      Produkt Diagram
    </Typography>
      
      <div className='links'>
        <a
          className='btn btn-gh'
         
        >
          Skriva Ut
        </a>
      </div>
    </div>
 
        <Bar data={data.Data} />
      
  </>
  </div>



 
  
);
}

