import React, { Component } from "react";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import { withStyles } from "@material-ui/core/styles";
import "./my-task-list.css";
import logo from '../../assets/images/logo.png';
import {
  Paper,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  FormControlLabel,
} from "@material-ui/core";
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
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
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
    margin: theme.spacing(1),
  },
});


class MyTaskList extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.state = {
      task: "",
      productImage: null ,
      serialNo:"",
      tasklist: []
    };
    this.onchangeImage = this.onchangeImage.bind(this);
  }
 
  // on load get the task list
  componentDidMount = () => {
    this.getTasks();
  };

  onChange = event => {
  
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onchangeImage=event=>{
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
   
    this.setState({
      productImage: URL.createObjectURL(event.target.files[0])
    });
        
  }
  // add task to the list
  onSubmit = () => {
    //debugger
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
        task: `📄 ${this.state.task}`,
        productImage:`${this.state.productImage}`,
        serialNo:`${this.state.serialNo}`,
         status: false
      };
    
      // add the task to the task list
      
      tasklist.push(task);

      // save the task list in the local storage
      localStorage.setItem("tasklist", JSON.stringify(tasklist));

      // clear the form
      this.setState({ task: "" });
      this.setState({ serialNo: "" });
      this.setState({ productImage: "" });
      // refresh the tasks
      this.getTasks();
    }
  };

  // get all the tasks
  getTasks = () => {
    // get the task list from the local storage
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));

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
                  <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                  <div style={{ wordWrap: "break-word" }}>{item.serialNo}</div>
                  <img style={{ width: "10%" }} src={item.productImage}/>
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

  render() { const { classes } = this.props;
    return (
      <div>
      <div className={classes.form}>
      <Box mt={5} px={3}>
      <Grid container spacing={3}
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={5}>
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
              value={this.state.serialNo}
              fluid
              placeholder="serialNo..."
            />
              <input type="file" name="file"  onChange={this.onchangeImage} />
              <Button
                 type="submit"
                 className={classes.button}
                 fullWidth
                 variant="contained"
                 color="primary"
                 onClick={this. updateQuery}
                  >
                Lägg till ny bild
                </Button>
              <Button
                 type="submit"
                 className={classes.submit}
                 fullWidth
                 variant="contained"
                 color="primary"
                  >
                Lägg till list
                </Button>
          </Form>
       
        <div>
          <Card.Group className={classes.paper}>{this.state.tasklist}</Card.Group>
        </div>
   
      </Paper>
      </Grid>
      </Grid>
      </Box>
      </div>
       </div>
    );
  }
}


export default withStyles(styles)(MyTaskList);