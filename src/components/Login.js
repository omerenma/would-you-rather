import React, { Component, Fragment } from "react";
import { Card, Select, MenuItem, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import "../App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      user: e.target.value,
    });
  };

  render() {
    console.log(this.props, "hitory");
    const { users, id } = this.props;
    // Save the auth id in local storage
    localStorage.setItem("login", id);
    return (
      <div>
        <h1>Login</h1>
        <form>
          <Card raised={true}>
            <Select
              style={{ width: 300 }}
              placeholder="Username"
              onChange={this.handleChange}
              value={this.state.user}
            >
              {Object.keys(users).map((user) => (
                <MenuItem
                  value={users[user].name}
                  key={users[user].id}
                  onClick={() => this.props.authedUser(users[user].id)}
                >
                  {users[user].name}
                </MenuItem>
              ))}
            </Select>
          </Card>
        </form>
        <Button
          onClick={(e) => {
            this.props.history.push('/home')
            window.location.reload(true)
          }}
        >
          Login
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({users}) => {
  return {
    users
  }
}
 export default withRouter(connect(mapStateToProps)(Login));
