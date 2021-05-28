import React from "react";
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
import NativeSelect from '@material-ui/core/NativeSelect';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
media: {
  height: 140,
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
export default function Products(props) {




    const classes = useStyles();
    const { control, handleSubmit, errors, formState, reset } = useForm({
      mode: "onChange",
    });
    const [open, setOpen] = React.useState(false);
    const[x,setX]=React.useState('');
    const[file,setFile]=React.useState('');
    
  
    const openModal=(e)=>{
      e.preventDefault();
      setOpen(!open);
    };
  
   const[categoryId,setCategoryId]=React.useState([]);
   const [categoryItem,setCategoryItem]=React.useState([]);
   const[productItem,setProductItem]=React.useState([]);
   const[productId,setProductId]=React.useState([]);
   React.useEffect(()=>{
       axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
           const categories=res.data;
           setCategoryItem(categories);
           
       
          })
   },[]);
  
    function deleteRow(id,e){
        axios.delete(`http://localhost:8000/api/v1/admin/product/${id}`).then(res=> {
          axios.get(`http://localhost:8000/api/v1/admin/productx/${categoryId}`).then(res=> {
            const products=res.data.product;
            setProductItem(products); 
          })
      })
    }
    const searchrow=()=>{  
       console.log("categoryId",categoryId);
             
    }  
    const onSubmit=(data)=>{
    //  debugger
      setCategoryId(data.category);
       axios.get(`http://localhost:8000/api/v1/admin/productx/${categoryId}`).then(res=> {
        const products=res.data.product;
        setProductItem(products); 
      })
    }
    const handleChange = (event) => {
      setCategoryId('');
      setCategoryId(event.target.value);
      console.log("categoryId",event.target.value);
      axios.get('http://localhost:8000/api/v1/admin/productx/${categoryId}').then(res=> {
         console.log(res.data);
       const products=res.data.product;
      setProductItem(products); 
     })
    
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  
   return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
      <img src={logo}/> 
      </Avatar>
      <Typography component="h1" variant="h5">
        Kobolde and partners
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <NativeSelect
                  id="demo-controlled-open-select"
                  open={open}
                  className={classes.form}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  onChange={handleChange}
                >
                {categoryItem.map(item =>(
                  <option value={item._id}>
                    {item.title }
                  </option>
                  
                ))}
                </ NativeSelect>
          </Grid>
         </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
         List
        </Button>
        </form>
      
      </div>
      {productItem.map(item =>(
             <Card className={classes.root_card}> 
             <CardActionArea>
             <CardMedia
             className={classes.media}
             image={item.image}
             />
             <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
             Produkt Title:{item.task}
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p">
             Produkt serialNo:{item.serialNo}
             </Typography>
             </CardContent>
             </CardActionArea>
            <CardActions>
            
            <IconButton aria-label="delete" className={classes.margin}  color="secondary">
            <TrashIcon fontSize="small" onClick={(e)=>deleteRow(item._id, e)}/>
            </IconButton>
           <span style={{ paddingRight: 10 }}>Delete</span>      
         </CardActions>
         </Card>
             ))}
   </Container>
  )
}

