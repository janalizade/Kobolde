import React from "react";
import { makeStyles, createStyles,withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
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
  
const useStyles = makeStyles((theme) =>
  createStyles({
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
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
export default function Category(props) {
  const classes = useStyles();
   const { control, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });
 const [categoryItem,setCategoryItem]=React.useState([]);
 const[categories,setCategories]=React.useState([]);
 React.useEffect(()=>{
      axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/category').then(res=>{
         const categories=res.data;
        setCategoryItem(categories);
        })
 },[]);

  const onSubmit = (data) => {
    console.log("title",data);
      let userObject = {
           title:data.title,
        
     };
          
      axios.post('https://kobolde.ahoora.se:8443/api/v1/admin/category', userObject)
      .then((res) => {
        console.log(res.data)
        axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/category').then(res=>{
        const categories=res.data;
       setCategoryItem(categories);
       })
       }).catch((error) => {
          console.log(error)
      }); 
     };
function deleteRow(id, e){ 
  setCategories(''); 
    axios.delete(`https://kobolde.ahoora.se:8443/api/v1/admin/category/${id}`)  
      .then(res => {  
       console.log(res);  
       console.log(res.data);  
       axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/category').then(res=>{
      const categories=res.data;
     setCategoryItem(categories);
     })
     })  
    }  
   return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
        <Grid container spacing={2}>
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
         Lägg till Kategori
        </Button>
        </form>
        <Grid item xs={12}>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
        <TableHead >
         <TableRow>
         <StyledTableCell>Kategorititel</StyledTableCell>
         <StyledTableCell>Handling</StyledTableCell> 
         <StyledTableCell>Handling</StyledTableCell> 
         </TableRow>
         </TableHead>
              {categoryItem.map(item =>(
          <StyledTableRow>
          <StyledTableCell>{item.title}</StyledTableCell>
          <StyledTableCell>
          <IconButton aria-label="delete" className={classes.margin}  color="secondary">
          <TrashIcon fontSize="small" onClick={(e)=>deleteRow(item._id, e)}/>
          </IconButton>
          </StyledTableCell>  
          <StyledTableCell>
          <IconButton aria-label="delete" className={classes.margin}  color="secondary">
          <EditIcon fontSize="small" />
          </IconButton>
          </StyledTableCell>
          </StyledTableRow>
       ))}
         </Table>
         </TableContainer>
        </Grid>  
      </div>
   </Container>
  )
}

