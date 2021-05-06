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
import imageupload from '../components/ImageUpload';
import {
    Button,
    TextField,
    Box,
    Typography,
    Grid,
    FormControlLabel,
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
 React.useEffect(()=>{
     axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
         const categories=res.data;
         setCategoryItem(categories);
        })
 },[]);

 const onChangeHandler=(e)=> {
 
    const file = URL.createObjectURL(e.target.files[0])
     setFile(file)
    
    }
  const resetFile=(event)=> {
    event.preventDefault();
    setFile({ file: null });
  }



  const onSubmit = (data) => {
      let userObject = {
           title:data.title,
           price:data.price,
           quantity:data.quantity,
           image:file,
        
     };
    
     axios.post(`http://localhost:8000/api/v1/admin/category/product/${categoryId}`,userObject) 
      .then((res) => {
        console.log("res statement is ",res.data)
       }).catch((error) => {
          console.log(error)
      }); 
};

const handleChange = (event) => {
  setCategoryId( event.target.value);
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
            <InputLabel id="demo-controlled-open-select-label">Ny Produkt</InputLabel>
            <FormControl className={classes.formControl}>
      
             <NativeSelect
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
 
                             
            <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>        
              <Controller
                as={TextField}
                name="title"
                control={control}
                fullWidth
                variant="outlined"
                label="Produkt Titel "
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.title && "Det kan inte vara tom"}
                error={errors.title && true}
              />
              <Controller
                as={TextField}
                name="quantity"
                control={control}
                fullWidth
                variant="outlined"
                label="Kvantitet"
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.quantity && "Det kan inte vara tom"}
                error={errors.quantity && true}
              />
                <Controller
                as={TextField}
                name="price"
                control={control}
                fullWidth
                variant="outlined"
                label="Pris"
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.price && "Det kan inte vara tom"}
                error={errors.price && true}
              />
                <div className={classes.paper}>
                <label htmlFor="name">ladda upp Produkts Bild</label> 
                <div>
                <input className={classes.submit} type="file" onChange={onChangeHandler} />
                
               
                <button style={{ textAlign: "left" }} className={classes.submit} onClick={resetFile}>Ta bort Fil</button>
              
               
                <img style={{ width: "100%" }} src={file} />
              
                </div>
              
                </div>
                
              

                <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 className={classes.submit} >
                Lägg till ny produkt
                </Button>
              
              </form>
              </FormControl>
            
     
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
