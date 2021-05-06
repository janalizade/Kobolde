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


export default function Category(props) {
  const classes = useStyles();
  const { control, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });
  const [open, setOpen] = React.useState(false);
  const[x,setX]=React.useState('');
  const[categories,setCategories]=React.useState([]);
 /* const show=()=>{
    setOpen(true);
  }*/

 const [categoryItem,setCategoryItem]=React.useState([]);
 React.useEffect(()=>{
     axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
         const categories=res.data;
        setCategoryItem(categories);
        })
 },[]);

  const onSubmit = (data) => {
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
       //debugger;
    //  const  categories =categories.filter(item => item._id !== id);  
    //   setCategoryItem(categories);  
    axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
      const categories=res.data;
     setCategoryItem(categories);
     })
     })  
     
     
 }  
 

  return (
    <div className={classes.root}>
      <Box mt={5} px={2}>
        <Grid container spacing={3}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper className={classes.paper}>
              
              <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
                              
              <Controller
                as={TextField}
                name="title"
                control={control}
                fullWidth
                variant="outlined"
                label="Kategori"
                defaultValue=""
                style={{ marginTop: 10 }}
                className={classes.textField}
                rules={{ required: true }}
                helperText={errors.name && "Det kan inte vara tom"}
                error={errors.name && true}
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
       <TableCell>Id</TableCell>
       <TableCell>Handling</TableCell> 
       
         </TableRow>

         </TableHead>

         {categoryItem.map(item =>(
           
        <TableRow>
        <TableCell>{item.title}</TableCell>
        
        <TableCell>{item._id}</TableCell>
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
        </div>
      );
    }
  }

