import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NewQuestion from "./components/NewQuestion";
import Leaderboard from "./components/LeaderBoard";
import PollsDetails from "./components/PollsDetails";
import NotFound from "./components/NotFound";

import "./App.css";
import Login from "./components/Login";
import share from "./actions/share";
import store from "./store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: "",
      id: null,
    };
  }
  componentWillMount() {
    this.props.dispatch(share());
  }
  setAuthedUser = (id) => {
    // This method is to  set the auth user to the id of the user clicked in the login  select form
    this.setState(() => ({ id }));
    console.log(id, "iddddddddddddddd");
  };

  render() {
    const { id } = this.state;
    const { users, auth } = this.props;

    return (
      <div className="App">
        <Router>
          {auth === null ? (
            <div className="App-header">
              <Route
                exact
                path="/"
                component={Login}
                authedUser={this.setAuthedUser}
                users={users}
                id={id}
              />
              {/* <Login authedUser={this.setAuthedUser} users={users} id={id} /> */}
            </div>
          ) : (
            <div className="App-header">
              <Switch>
                <Route exact path="/">
                  <Login
                    authedUser={this.setAuthedUser}
                    users={users}
                    id={id}
                  />
                </Route>

                <Route path="/home" component={Home} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/questions/:id" component={PollsDetails} />
                <Route component={NotFound} />
              </Switch>
            </div>
          )}
        </Router>
      </div>
    );
  }
}
const mapStateToProps = ({ users, auth }) => {
  return {
    users,
    auth,
  };
};
export default connect(mapStateToProps)(App);
