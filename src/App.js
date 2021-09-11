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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: "",
    };
  }
  componentDidMount() {
    this.props.dispatch(share());
  }
  setAuthedUser = (id) => {
    // This method is to  set the auth user to the id of the user clicked in the login  select form
    this.setState(() => ({ id }));
  };

  render() {
    const { id } = this.state;
    const { users, auth } = this.props;

    return (
      <div className="App">
        <Router>
          {auth === null || auth.id === "undefined" ? (
            <div className="App-header">
              <Route exact path="/">
                <Login authedUser={this.setAuthedUser} users={users} id={id} />
              </Route>
            </div>
          ) : (
            <div>
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/questions/:id" component={PollsDetails} />
                {/* <Route component={NotFound} /> */}
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
