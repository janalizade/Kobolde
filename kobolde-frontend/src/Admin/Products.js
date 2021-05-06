import React from "react";
import { makeStyles, createStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from "@material-ui/icons/EditOutlined";
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TrashIcon from '@material-ui/icons/DeleteOutlined';

//import ProductCard from '../Admin/ProductCard'
import {
    Button,
    TextField,
    Box,
    Typography,
    Grid,
  } from "@material-ui/core";
  import { useForm, Controller } from "react-hook-form";
  import axios from 'axios';
  //import ItemList from './ItemList';
  import MenuItem from '@material-ui/core/MenuItem';
import { DeleteIcon } from '@material-ui/icons/Delete';
import logo from '../assets/images/logo.png';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(30),
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
      
    button: {
        width:40,
        height:20,
        margin : theme.spacing(3,0,2),  
    },
    Table: {
      width: '100%',
      backgroundColor: 'orange',
      maxWidth: 2200,
      marginTop:350,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);


export default function Product(props) {
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
    setCategoryId(data.category);
     axios.get(`http://localhost:8000/api/v1/admin/productx/${categoryId}`).then(res=> {
      const products=res.data.product;
      setProductItem(products); 
    })
  }
  const handleChange = (event) => {
 
  
};

const handleClose = () => {
  setOpen(false);
};

const handleOpen = () => {
  setOpen(true);
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
            <form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel id="demo-controlled-open-select-label">Produkts</InputLabel>
            <FormControl  className={classes.formControl} >
            <Controller
                as={
                  <NativeSelect
                  name="categoryTitle"  
                  id="demo-controlled-open-select"
                  open={open}
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
                  
                }
                name="category"
                control={control}
                fullWidth
                variant="outlined"
                label="Kategori Titel "
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.title && "Det kan inte vara tom"}
                error={errors.title && true}
              />
       <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > List </Button>
        <Table>
          <TableHead className={classes.Table}>
          <TableRow>
            <TableCell>titel</TableCell>
            <TableCell>kvantitet</TableCell>
            <TableCell>pris</TableCell>
            <TableCell>ProduktId</TableCell>
            <TableCell>bild</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
          </TableHead>


          {productItem.map(item =>(
             <TableRow>
             <TableCell>{item.title}</TableCell>
             <TableCell>{item.quantity}</TableCell>
             <TableCell>{item.price}</TableCell>
             <TableCell>{item._id}</TableCell>
             <TableCell><img src={item.image} height="50" /></TableCell>
             <TableCell>
             <IconButton aria-label="delete" className={classes.margin}  color="secondary">
             <TrashIcon fontSize="small" onClick={(e)=>deleteRow(item._id, e)}/>
             </IconButton>
           </TableCell>
           </TableRow>
             ))}
        </Table>
      </FormControl>
        </form>  
           </Paper>
          </Grid>
        </Grid>
      </Box>
    

     </div>
  )
}


class UploadPreview extends React.Component {
    constructor(props) {
      super(props);
      this.state = { file: null };
      this.onChange = this.onChange.bind(this);
      this.resetFile = this.resetFile.bind(this);
    }
    onChange(event) {
      this.setState({
        file: URL.createObjectURL(event.target.files[0])
      });
    }
  
    resetFile(event) {
      event.preventDefault();
      this.setState({ file: null });
    }
    render() {
      return (
        <div>
          <input type="file" onChange={this.onChange} />
          {this.state.file && (
            <div style={{ textAlign: "center" }}>
              <button onClick={this.resetFile}>Ta bort Fil</button>
            </div>
          )}
          <img style={{ width: "100%" }} src={this.state.file} />
          <div> {this.state.file}</div>
        </div>
        
      );
    }
  }
