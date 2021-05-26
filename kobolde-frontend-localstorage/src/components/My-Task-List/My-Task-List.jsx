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
  Grid

} from "@material-ui/core";
import logo from '../My-Task-List/logo.png';
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

const styles = theme => ({
  root_card: {
    marginTop: theme.spacing(2),
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    Field: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '90%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '85%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    width: '90%',
    marginTop: theme.spacing(1),
    
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
  button: {
   backgroundColor:'orange',
   width: '90%',
   marginTop: theme.spacing(1),
  
  },
});


function ButtonComponent(props) {
  const { onClick, loading} = props;
   return (
    <Button variant="contained" onClick={onClick} disabled={loading} style={{width: '90%', color: 'green',marginTop:6}} >
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
         console.log("categoryItem---->",categoryItem);
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
            <Card1 className={classes.root_card}> 
             <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {item.task}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {item.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {item.serialNo}
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
    return (
      
      <div className={classes.form}>
        
      <Grid container spacing={2}
        direction="row">
          <Paper className={classes.paper}>
          <Typography variant="h3" gutterBottom>
           
          </Typography>
            <p style={{color: 'green'}}  id='statusCheck'>{this.state.connectionStatus}</p>
            <FormControl className={classes.formControl}>
            <NativeSelect
              id="demo-controlled-open-select"
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
          





            <Form  onSubmit={this.onSubmit}>
            <TextField
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              className={classes.Field}
              placeholder="motor..."
            />
            <TextField
              type="text"
              name="serialNo"
              onChange={this.onChange}
              value={this.state.serialNo}
              className={classes.Field}
              fluid
              placeholder="serialNo..."
            />
              <input type="file" name="file"  onChange={this.fileChangedHandler}className={classes.Field} />
              <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 onClick={this.onSubmit}
                 className={classes.button} >
                Lägg till ny Produkt
                </Button>             
                <React.Fragment>
                {this.state.loading && <ColoredLinearProgress />}
                <br />
                <ButtonComponent onClick={this.onClick} loading={this.state.loading}className={classes.Field} />
                </React.Fragment>
      
        </Form>
        </FormControl>
      </Paper>
      </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9}>
        <Card.Group className={classes.paper}>{this.state.tasklist}</Card.Group>
        </Grid>
     
    
      </div>
    );
  }
}

export default withStyles(styles)(MyTaskList);