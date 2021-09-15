import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import NewQuestion from "./components/NewQuestion";
import Leaderboard from "./components/LeaderBoard";
import PollsDetails from "./components/PollsDetails";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";

import "./App.css";
import Login from "./components/Login";
import share from "./actions/share";
import store from "./store";
import Appbar from "./components/Appbar";

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
        {this.props.auth === true ? (
        <div className="App-header">
          <Route path="/" component={Login}></Route>
          </div>
          
        ) : (
          <React.Fragment>
            {/* <Route
              path={["/home", "/add", "/questions", "/leaderboard"]}
              component={Appbar}
            /> */}
            <Switch>
              <Route exact path="/home" component={Home}></Route>

              <Route exact path="/add" component={NewQuestion}></Route>

              <Route
                exact
                path="/questions/:id"
                component={PollsDetails}
              ></Route>

              <Route exact path="/leaderboard" component={Leaderboard}></Route>

              <Route exact path="/logout" component={Logout}></Route>
              <Redirect exact from="/" to="/home" />
              <Route component={NotFound} />
            </Switch>
          </React.Fragment>
        )}
        {/* {auth === true ? (
          <div className="App-header">
            <Route exact path="/" component={Login} />
          </div>
        ) : (
          <div className="App-header">
            <Switch>
            <Route  path="/">
              <Login />
            </Route>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/add" component={NewQuestion}></Route>
              <Route exact path="/leaderboard" component={Leaderboard}></Route>
              <Route
                exact
                path="/questions/:id"
                component={PollsDetails}
              ></Route>
                <Route component={NotFound} />
              <Route exact path="/logout" component={Logout}></Route>
              <Redirect exact from="/" to="/home" />
            </Switch>
          </div>
        )} */}
      </div>
    );
  }
}
const mapStateToProps = ({ users, auth }) => {
  return {
    users,
    auth: auth === null,
  };
};
export default connect(mapStateToProps)(App);
