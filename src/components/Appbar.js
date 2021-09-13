import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Paper, Avatar } from "@material-ui/core";
import "../App.css";

class NavBar extends Component {
  render() {
    const { users, id } = this.props;
    return (
      <div>
        <Paper
          elevation={5}
          className="App"
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Display of flex */}

          <div style={{paddingRight:'30px'}}>
            <Link to="/home">Home</Link>
            <Link to="/add">New Question</Link>
            <Link to="/leaderboard">Leader Board</Link>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <span
              style={{
                position: "relative",
                left: -30,
                top: 10,
                fontSize: 20,
                // fontWeight: "bolder",
                color: "#282c34",
              }}
            >
              Welcome, {users[id].name}
            </span>
            <Avatar
              className="avatar"
              src={users[id].avatarURL}
              style={{ position: "relative", left: -20 }}
            />
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("login");
              }}
            >
              Logout
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth }) => {
  return {
    users,
    id: auth.id,
  };
};
export default connect(mapStateToProps)(NavBar);
