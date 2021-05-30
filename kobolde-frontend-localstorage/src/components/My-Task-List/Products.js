import React from "react";
import { makeStyles, createStyles,withStyles} from '@material-ui/core/styles';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import logo from '../My-Task-List/kobolde-logo.png';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NativeSelect from '@material-ui/core/NativeSelect';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {
    Button,
    Typography,
    Grid,
  } from "@material-ui/core";
  import { useForm } from "react-hook-form";
  import axios from 'axios';
const useStyles = makeStyles((theme) =>
  createStyles({
card: {
      marginTop: theme.spacing(2),
      maxWidth: 345,
    },
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
export default function Products(props) {
    const classes = useStyles();
    const { control, handleSubmit, errors, formState, reset } = useForm({
      mode: "onChange",
    });
    const [open, setOpen] = React.useState(false);
    const openModal=(e)=>{
      e.preventDefault();
      setOpen(!open);
    };
   const[categoryId,setCategoryId]=React.useState([]);
   const [categoryItem,setCategoryItem]=React.useState([]);
   const[productItem,setProductItem]=React.useState([]);
  React.useEffect(()=>{
       axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/category').then(res=>{
           const categories=res.data;
           setCategoryItem(categories);
           if(Object.keys(categoryItem)[0]){
           setCategoryId(categories[Object.keys(categories)[0]]._id);
          }
          })
   },[]);
    function deleteRow(id,e){
        axios.delete(`https://kobolde.ahoora.se:8443/api/v1/admin/product/${id}`).then(res=> {
          axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/productx/${categoryId}`).then(res=> {
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
    console.log("onclick categoryId",categoryId);
        setCategoryId(data.category);
        
        axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/productx/${categoryId}`).then(res=> {
          console.log("res-data--->",res.data);
        const products=res.data.product;
        setProductItem(products); 
      })
    }
    const handleChange = (event) => {
      setCategoryId('');
      setCategoryId(event.target.value);
      console.log("categoryId",event.target.value);
      axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/productx/${categoryId}').then(res=> {
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
             <Card className={classes.card}> 
             <CardActionArea>
             <CardMedia
             className={classes.media}
             image={item.image}
             />
             <CardContent>
             <Typography gutterBottom variant="h5" component="h2">
             Produkt Title:{item.title}
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

