import React, { Component } from "react";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import { makeStyles, createStyles} from '@material-ui/core/styles';
import "./my-task-list.css";
import { Offline, Online } from "react-detect-offline"
import AppBar from 'material-ui/AppBar';
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
import { green } from "@material-ui/core/colors";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import formData from 'form-data';
const styles = theme => ({
 
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
    marginTop: theme.spacing(10),
  },
  submit: {
    width: '100%',
    marginTop: theme.spacing(2),
    
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
   width: '100%',
   marginTop: theme.spacing(2),
  
  },
});

class MyTaskList extends Component {
 
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.state = {
      task: "",
      taskCategory:"",
      taskSerialNo:"",
      taskImage: { file: null } ,
       tasklist: [],
       connsctionStatus:"",
       selection : 1
    };
    window.localStorage.clear();
  }
 
  // on load get the task list
  componentDidMount = () => {
    var status=navigator.onLine;
    if(status) {
     this.setState({connectionStatus:"online"});
  
    }else{
      this.setState({connectionStatus:"offline"});
      }
    this.getTasks();
  };


  
  onChange = event => {
  
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
 
  handleFileInputChange = e => {
   
    console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("File Is", result);
        this.setState({
          base64URL: result,
          file
        });
        this.setState({
          taskImage: result
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0]
    });
  
  };




  onchangeImage=event=>{
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
   
    this.setState({
      taskImage: event.target.files[0]
    });
        
  }
  
onSync=()=>{
  let tasklist = JSON.parse(localStorage.getItem("tasklist"));
     tasklist.map((item, index) => {
      console.log("item task",item);
     console.log("item task",item.task);
     console.log("item serialNo",item.taskSerialNo);
     console.log("item image",item.taskImage.constructor);
      var formdata =new formData();
      formdata.append('title',item.task);
      formdata.append('serialNo',item.taskSerialNo);
      const contentType = 'image/png';
      const data = item.taskImage.split('base64,')[1];
      const blob = base64StringToBlob(data, contentType);
      console.log(blob);
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
  }
  


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
        taskCategory: `${this.state.taskCategory}`,
        taskSerialNo: ` ${this.state.taskSerialNo}`,
        taskImage:` ${this.state.taskImage}`,
         status: false
      };
    
      // add the task to the task list
      
      tasklist.push(task);

      // save the task list in the local storage
    
      localStorage.setItem("tasklist", JSON.stringify(tasklist));

      // clear the form
      this.setState({ task: "" });
      this.setState({taskCategory:""});
      this.setState({taskSerialNo:""});
      this.setState({taskImage:""});

      // refresh the tasks
      this.getTasks();
    }
  };

  // get all the tasks
  getTasks = () => {
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
        
            <Card key={index} color={color} fluid style={cardBackground}>
              <Card.Content>
                <Card.Header textAlign="left" style={taskComplete}>
                  <div style={{ wordWrap: "break-word" }}>motor : {item.task}</div>
                  <div style={{ wordWrap: "break-word" }}>category: {item.taskCategory}</div>
                  <div style={{ wordWrap: "break-word" }}>serialNo:{item.taskSerialNo}</div>
                  <img style={{ width: "40%" }} src={item.taskImage}/>
                </Card.Header>

                <Card.Meta textAlign="right">
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
                </Card.Meta>
              </Card.Content>
            </Card>
          
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
      <Box mt={7} px={8}>
      <Grid container spacing={6}
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={12} sm={4} md={6} lg={5}>
         <Paper className={classes.paper}>
          <Typography variant="h3" gutterBottom>
            <img src={logo}/>
          </Typography>
        
       
          <p style={{color: 'green'}}  id='statusCheck'>{this.state.connectionStatus}</p>
          <Form  onSubmit={this.onSubmit}>
          <Input
              type="text"
              name="taskCategory"
              onChange={this.onChange}
              value={this.state.taskCategory}
              fluid
              placeholder="category..."
            />
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="motor..."
            />
         
            <Input
              type="text"
              name="taskSerialNo"
              onChange={this.onChange}
              value={this.state.taskSerialNo}
              fluid
              placeholder="serialNo..."
            />
              <input type="file" name="file"  onChange={this.handleFileInputChange} />
              
            
          
        <div className={classes.root}>
        <MuiThemeProvider >
         <DropDownMenu 
          value={this.state.selection} 
          
         >
          <MenuItem value={1} primaryText="Lägg till list"   onClick={this.onSubmit}/>
          <MenuItem value={2} primaryText="Sync" onClick={this.onSync} />
          
        </DropDownMenu>
        <br/><br/><br/>
    
        </MuiThemeProvider>
        </div>        
          <Card.Group className={classes.paper}>{this.state.tasklist}</Card.Group>
      
        </Form>
      </Paper>
      </Grid>
      </Grid>
      </Box>
      </div>
    );
  }
}

export default withStyles(styles)(MyTaskList);
