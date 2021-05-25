import React from "react";
import { makeStyles, createStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from "@material-ui/icons/EditOutlined";
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import logo from '../My-Task-List/logo.png';
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
import { DeleteIcon } from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '80%',
      marginTop: theme.spacing(15),
      flexGrow: 1,
    },
    paper: {
      width: '80%',
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
      
    Table: {
      width: '70%',
      backgroundColor: 'orange',
      maxWidth: 2200,
      marginTop:350,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);


export default function Category(props) {
  const classes = useStyles();
  const isError = false;
  const { control, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });
  const [open, setOpen] = React.useState(false);
  const[x,setX]=React.useState('');
  const[categories,setCategories]=React.useState([]);

 const [categoryItem,setCategoryItem]=React.useState([]);
 React.useEffect(()=>{

     axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
         const categories=res.data;
        setCategoryItem(categories);
        })
 },[]);

  const onSubmit = (data) => {
    console.log("title",data);
      let userObject = {
           title:data.title,
        
     };
          
      axios.post('http://localhost:8000/api/v1/admin/category', userObject)
      .then((res) => {
        console.log(res.data)
        axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
        const categories=res.data;
       setCategoryItem(categories);
       })
       }).catch((error) => {
          console.log(error)
      }); 
     };


function deleteRow(id, e){ 
  setCategories(''); 
    axios.delete(`http://localhost:8000/api/v1/admin/category/${id}`)  
      .then(res => {  
       console.log(res);  
       console.log(res.data);  
       axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
      const categories=res.data;
     setCategoryItem(categories);
     })
     })  
     
     
 }  
 

  return (
    <div className={classes.form}>
    <Grid container spacing={3}
      direction="row">
        <Paper className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          <img src={logo}/>
        </Typography>
              <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
              <Controller
               control={control}
               name="title"
               defaultValue=""
               style={{ marginTop: 10 }}
               className={classes.textField}
               render = {({ field})=> (
                <TextField
                {...field}
                   fullWidth
                    label="Kategori"
                    required
                />
            )}
         />  
            
                <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 className={classes.submit} >
                Lägg till ny kategori
                </Button>
                
              </form>
            
            
      <Table  >
       
           
       <TableHead className={classes.Table}>
       <TableRow>
       <TableCell>Kategorititel</TableCell>
       <TableCell>Handling</TableCell> 
       </TableRow>
       </TableHead>

         {categoryItem.map(item =>(
           
        <TableRow>
        <TableCell>{item.title}</TableCell>
        <TableCell>
        <IconButton aria-label="delete" className={classes.margin}  color="secondary">
        <TrashIcon fontSize="small" onClick={(e)=>deleteRow(item._id, e)}/>
        </IconButton>
                  
      
        
       </TableCell>   
       </TableRow>
     ))}
       </Table>
       </Paper>
       </Grid>
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
        </div>
      );
    }
  }

