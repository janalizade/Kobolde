import React from "react";
import { makeStyles, createStyles,withStyles} from '@material-ui/core/styles';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NativeSelect from '@material-ui/core/NativeSelect';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit';
import { Header, Form, Input, Icon } from "semantic-ui-react";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {
   Modal
 } from "react-bootstrap";
import {
    TextField,
    Button,
    Typography,
    Grid,
  } from "@material-ui/core";
  import { useForm , Controller} from "react-hook-form";
  import axios from 'axios';
const useStyles = makeStyles((theme) =>
  createStyles({
card: {
      marginTop: theme.spacing(2),
      maxWidth: 345,
    },
paper: {
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
    const [showModal, setShowModal] = React.useState(false);
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
   
   let theArray=[{title:''}]
  React.useEffect(()=>{
      axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/category').then(res=>{
      const categories=res.data;
      setCategoryItem(categories);
      
      console.log('first  elemtnt -------------->',res.data);
      setCategoryId(categories[Object.keys(categories)[0]]._id);
       })},[]);
 
    function deleteRow(id,e){
           axios.delete(`https://kobolde.ahoora.se:8443/api/v1/admin/product/${id}`).then(res=> {
           console.log("id",id);
           console.log("categoryId",categoryId);
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
       setCategoryId(data.category);
       axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/productx/${categoryId}`).then(res=> {
       console.log("res-data--->",res.data);
        const products=res.data.product;
        setProductItem(products); 
        setCategoryId(categoryId);
        
      })
    }
    const handleChange = (event) => {
      setCategoryId(event.target.value);
      axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/productx/${categoryId}`).then(res=> {
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
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <p className="card-category">Välj kategori för Produkt listen:</p>
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
             <Typography variant="body2" color="textSecondary" component="p">
             Produkt arebtsTid:{item.arbetsTid}
             </Typography>
             <Typography variant="body2" color="textSecondary" component="p">
             Produkt arbetsGång:{item.arbetsGang}
             </Typography>
             </CardContent>
             </CardActionArea>
            <CardActions>
            <IconButton aria-label="delete" className={classes.margin}  color="secondary">
            <TrashIcon fontSize="small" onClick={(e)=>deleteRow(item._id, e)}/>
            </IconButton>
            <span style={{ paddingRight: 10 }}>Delete</span>   
            <IconButton aria-label="delete" className={classes.margin}  color="secondary">
            <EditIcon fontSize="small" onClick={()=>setShowModal(true)}/>
            </IconButton>
            <span style={{ paddingRight: 10 }}>Edit</span>      
         </CardActions>
         </Card>
          ))}
        <Modal
          className="modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-badge"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
          
          <div className="modal-footer">
          <Form   onSubmit={onSubmit} novalidate>
            <TextField
              variant="outlined"
              margin="normal"
              novalidate
              fullWidth
              type="text"
              name="task"
            
              placeholder="motor..."
              />
            <TextField
              variant="outlined"
              margin="normal"
              novalidate
              fullWidth
              type="text"
              name="serialNo"
              
              placeholder="serieNummer..."
              />
              <TextField
              variant="outlined"
              margin="normal"
              novalidate
              fullWidth
              type="text"
              name="arbetsGang"
              
              placeholder="arbetsGång..."
              />
              <TextField
              variant="outlined"
              margin="normal"
              novalidate
              fullWidth
              type="text"
              name="arbetsTid"
             
              placeholder="arbetsTid..."
              />
              <input accept="image/*" className={classes.input} name="file" id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
              </IconButton>
              </label>
                <Button
                 variant="outlined"
                 margin="normal"
                 fullWidth
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                >
                redigera Produkt
                </Button>             
                    
            </Form>
            
          </div>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Back
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
        {/* End Modal */}
   </Container>
   
  )
}

