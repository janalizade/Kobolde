import React, { Component } from "react";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import "./my-task-list.css";
import axios from 'axios';
import { base64StringToBlob } from 'blob-util';
import {
  Button,
  TextField,
  Paper,
  Box,
  Typography,
  Grid,
  InputLabel

} from "@material-ui/core";
import logo from '../My-Task-List/kobolde-logo.png';
import { withStyles } from "@material-ui/core/styles";
import formData from 'form-data';
import Resizer from 'react-image-file-resizer';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { CircularProgress} from '@material-ui/core';
import ColoredLinearProgress from './LineProgress';
import Card1 from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
const styles = theme => ({
  root_card: {
    marginTop: theme.spacing(2),
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 2200,
    alignItems: 'center',
  },
    Field: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%',
    align:'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  container: {
    flexWrap: 'wrap',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    maxWidth: 1800,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  Table: {
    width: '100%',
    backgroundColor: 'orange',
    maxWidth: 1800,
    marginTop:350,
  },
  input: {
    display: 'none',
  },
  formControl: {
    width: '100%',
    margin: theme.spacing(1),
   },
  button: {
  
   width: '90%',
   marginLeft: theme.spacing(2),
   marginRight: theme.spacing(2),
   marginTop: theme.spacing(1),
  
  },
});


function ButtonComponent(props) {
  const { onClick, loading} = props;
   return (
    <Button variant="contained" onClick={onClick} disabled={loading} style={{width: '100%',  backgroundColor: 'orange'}} >
      {loading && <CircularProgress size={14} />}
      {!loading && 'Sync'}
    </Button>
  );
}

class MyTaskList extends Component {
 
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.state = {
      task: "",
      category:"",
      serialNo:"",
      image: { file: null } ,
      tasklist: [],
      selection : 1,
      categoryItem:[],
      categoryId:"",
      open:[false],
      loading: false
    };
    
    window.localStorage.clear();
  }
   onChange = async (event) => {
    const file = event.target.files[0];
   };
   onClick = () => {
    this.setState({ loading: true });
    setTimeout(() => this.setState({ loading: false }), 3000); //3 seconds
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    if(tasklist){
     tasklist.map((item, index) => {
       console.log("tasklist",tasklist);
      var formdata =new formData();
      formdata.append('title',item.task);
      formdata.append('serialNo',item.serialNo);
      formdata.append('category_id', this.state.categoryId);
      const contentType = 'image/png';
      const data = item.image.split('base64,')[1];
      const blob = base64StringToBlob(data, contentType);
        formdata.append('image',blob);
         var config = {
          method: 'post',
          url: 'http://localhost:8000/api/v1/admin/productx',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : formdata
        };
        
        axios(config)
         .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    
    });
  }};
  // on load get the task list
  componentDidMount = () => {
     var status=navigator.onLine;
    if(status) {
      this.setState({connectionStatus:"online"}); 
       }else{
       this.setState({connectionStatus:"offline"});
      }
     this.getTasks();
        //Category List loaded from database
     axios.get('http://localhost:8000/api/v1/admin/category').then(res=>{
         const categories=res.data;
        
         localStorage.setItem("categoryItem", JSON.stringify(categories));
         let categoryItem = JSON.parse(localStorage.getItem("categoryItem")); 
         this.setState({categoryItem:categoryItem});
         this.setState({categoryId:categoryItem[Object.keys(categoryItem)[0]]._id});
         })
  
    };
  
   handleClose = () => {
      this.setState({open:false});
    };
    
   handleOpen = () => {
    this.setState({open:true});
    };
   fileChangedHandler=(event)=> {
    var fileInput = false
    if(event.target.files[0]) {
        fileInput = true
    }
    if(fileInput) {
        Resizer.imageFileResizer(
            event.target.files[0],
            300,
            300,
            'JPEG',
            100,
            0,
            uri => {
                 this.setState({
                  image: uri
                });
                console.log(uri)
            },
            'base64'
        );
    }
}
 handleChange = (event) => {
  this.setState({categoryId:event.target.value});
};
  onChange = event => {
  
    this.setState({
      [event.target.name]: event.target.value
    });
  };
     // add task to the list
  onSubmit = () => {
    // check is task is empty string
    if (this.state.task) {
      // get the task list from the local storage
      let tasklist = JSON.parse(localStorage.getItem("tasklist"));

      // task list is null means empty
      // create an empty list
      if (tasklist == null) {
        tasklist = [];
      }
      // create task object
      // default status is false
    
      
      let task = {
        
        task: ` ${this.state.task}`,
        category: `${this.state.categoryId}`,
        serialNo: ` ${this.state.serialNo}`,
        image:` ${this.state.image}`,
        status: false
      };
    
      // add the task to the task list
      tasklist.push(task);
      // save the task list in the local storage
      localStorage.setItem("tasklist", JSON.stringify(tasklist));
      // clear the form
      this.setState({ task: "" });
      this.setState({category:""});
      this.setState({serialNo:""});
      this.setState({image:""});
     // refresh the tasks
      this.getTasks();
    }
  };
  // get all the tasks
  getTasks = () => {
    const { classes } = this.props;
    // get the task list from the local storage
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    console.log(tasklist);
    // check if task list is empty
    if (tasklist) {
      // sort all the tasks on the basis of status
      // completed task will move down
      tasklist = tasklist.sort((a, b) => {
        if (a.status) {
          return 1;
        } else if (b.status) {
          return -1;
        }
        return 0;
      });

      // save the task list in the local storage
      localStorage.setItem("tasklist", JSON.stringify(tasklist));

      // set the tasklist to the state
      this.setState({
        // default color
        // Incomplete: yellow
        // complete: green
        tasklist: tasklist.map((item, index) => {
          let color = "yellow";
          let cardBackground = { background: "white" };
          let taskComplete = { textDecoration: "none" };
          if (item.status) {
            color = "green";
            cardBackground.background = "beige";
            taskComplete["textDecoration"] = "line-through";
          }
          return (
          <Card1 key={index} color={color} fluid style={cardBackground} className={classes.root_card}> 
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
        <Icon
         link
         name="check circle"
         color="green"
         onClick={() => this.updateTask(index)}
         />
         <span style={{ paddingRight: 10 }}>Done</span>
        <Icon
         link
         name="undo"
         color="yellow"
         onClick={() => this.undoTask(index)}
         />
        <span style={{ paddingRight: 10 }}>Undo</span>
        <Icon
         link
         name="delete"
         color="red"
         onClick={() => this.deleteTask(index)}
        />
        <span style={{ paddingRight: 10 }}>Delete</span>      
      </CardActions>
      </Card1>
        );
          
        })
      });
    }
  };

  // update the task status to true
  updateTask = index => {
    
    // get the task list from the local storage
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    // change status to true
    tasklist[index].status = true;
    // save the updated task list
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    // refresh the task list
    this.getTasks();
  };

  // undone the task status from true to false
  undoTask = index => {
    // get the task list from the local storage
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    // change status to false
    tasklist[index].status = false;
    // save the updated task list
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    // refresh the task list
    this.getTasks();
  };

  // delete the task from the task list
  deleteTask = index => {
    // get the task list from the local storage
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    // remove the task from the task list
    tasklist.splice(index, 1);
    // save the updated task list
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    // refresh the task list
    this.getTasks();
  };

  render() {
    const { classes } = this.props;
    const isConnection=this.state.connectionStatus
    let icon;
    if(isConnection){
     icon=<WifiIcon></WifiIcon>
    }else
    {icon=<WifiOffIcon></WifiOffIcon>}
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
        <Grid container spacing={2}
        direction="row">
          <Grid item xs={12}>
            <FormControl className={classes.formControl} variant="outlined">
              <NativeSelect
              id="demo-controlled-open-select"
              variant="outlined"
              open={this.open}
              className={classes.Field}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              onChange={this.handleChange}
            >
            {this.state.categoryItem.map(item =>(
              <option value={item._id}>
                {item.title }
              </option>
              
            ))}
            </ NativeSelect>
            </FormControl>
            <Form  className={classes.container} onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              placeholder="motor..."
              />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              name="serialNo"
              onChange={this.onChange}
              value={this.state.serialNo}
              placeholder="serialNo..."
              />
              <input accept="image/*" className={classes.input} name="file" id="icon-button-file" type="file" onChange={this.fileChangedHandler}/>
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
                 onClick={this.onSubmit}
                 className={classes.submit} >
                Lägg till ny Produkt
                </Button>             
                <React.Fragment>
                {this.state.loading && <ColoredLinearProgress />}
                <br />
                <ButtonComponent   variant="outlined"
                 margin="normal"
                 fullWidth onClick={this.onClick} loading={this.state.loading}/>
                </React.Fragment>
      
        </Form>
        </Grid>
        </Grid>
             
      
        <Grid item xs={12} sm={9} md={9} lg={9}>
        <Card.Group className={classes.paper}>{this.state.tasklist}</Card.Group>
        </Grid>
     
    
      </div>
      </Container>
    );
  }
}

export default withStyles(styles)(MyTaskList);