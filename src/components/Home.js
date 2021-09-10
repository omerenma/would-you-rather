import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Card,
  Button,
} from "@material-ui/core";

import Nav from "./Appbar";
import Avatar from "react-avatar";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (e, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    // Get the logged In user's answered and unanswered question
    const { id, users, questions } = this.props;
    console.log(users[id]["answers"], "User logged In");
    const answeredQuestion = Object.keys(users[id]["answers"]);
    const sortedQuestions = Object.keys(questions).sort(
      (a, b) => questions[b].timestamps - questions[a].timestamps
    );

    return (
      <div>
        <Nav />
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Unanswered Question" {...a11yProps(0)} />
          <Tab label="Answered Question" {...a11yProps(1)} />
        </Tabs>

        {sortedQuestions.map((item, i) => {
          if (this.state.value === 0) {
            if (!answeredQuestion.some((e) => questions[item].id.includes(e))) {
              return (
                <TabPanel value={this.state.value} index={0}>
                  <Paper
                    style={{ width: 400, height: "auto", margin: "10px auto" }}
                  >
                    <Typography>{users[questions[item].author].name}</Typography>
                    <Card
                      style={{
                        display: "flex",
                        width: "auto",
                        height: "150px",
                      }}
                    >
                      <Avatar
                        src={users[questions[item].author].avatarURL}
                        style={{
                          marginLeft: 20,
                          marginTop: 40,
                          
                        }}
                      />
                      <Typography style={{ marginLeft: 70, marginTop: 20 }}>
                        Would You Rather...
                      </Typography>
                      <Button 
                      component={Link}
                      to={'/questions/:id' + questions[item].id}
                      style={{ marginLeft: -120, marginTop: 70 }}>
                        View Poll
                      </Button>
                    </Card>
                  </Paper>
                </TabPanel>
              );
            }
          } else {
            if(answeredQuestion.some((e) => questions[item].id.includes(e))){
              return (
                <Paper style={{ width: 400, height: "auto", margin: "10px auto" }}>
                <Typography>{users[questions[item].author].name}</Typography>
                <Card style={{ display: "flex", width: "auto", height: "150px" }}>
                  <Avatar
                    src={users[questions[item].author].avatartURL}
                    style={{
                      marginLeft: 20,
                      marginTop: 40,
                      
                    }}
                  />
                  <Typography style={{ marginLeft: 70, marginTop: 20 }}>
                    Would You Rather...
                  </Typography>
                  <Button 
                  component={Link}
                  to={'questions/:id' + questions[item].id}
                  style={{ marginLeft: -120, marginTop: 70 }}>
                    View Poll
                  </Button>
                </Card>
              </Paper>
              )
            }
          }
        })}
        <TabPanel value={this.state.value} index={1}></TabPanel>
      </div>
    );
  }
}
const mapStateToProps = ({ questions, users, auth }) => {
  return {
    users,
    questions,
    id: auth.id,
  };
};
export default connect(mapStateToProps)(Home);
