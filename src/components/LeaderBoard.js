import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Avatar } from "@material-ui/core";
import Nav from "./Appbar";

class Leaderboard extends Component {
  render() {
    const { auth, users } = this.props;
    let sorted = Object.keys(users).sort((a, b) => {
      let sortedSecondUser =
        Object.keys(users[b].answers).length +
        Object.keys(users[b].questions).length;

      let sortedFirstUser =
        Object.keys(users[a].answers).length +
        Object.keys(users[a].questions).length;
      return sortedSecondUser - sortedFirstUser;
    });

    console.log(sorted, "sorted");
    return (
      <div>
        <Nav />
        {sorted.map((sort, i) => (
          <Card elevation={1} style={{ width: 700, margin: "30px auto" }} key={i}>
            <div className="card-container">
              <Avatar src={users[sort].avatarURL} />
              <div className="card-content">
                <div>Name:{users[sort].name}</div>

                <div>
                  No. of Answered Questions:{" "}
                  {Object.keys(users[sort].answers).length}
                </div>
                <div>
                  No. of Asked questions:{" "}
                  {Object.keys(users[sort].questions).length}
                </div>
              </div>
              <div className="score">
                {Object.keys(users[sort].answers).length +
                  Object.keys(users[sort].questions).length}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, users }) => {
  return {
    auth,
    users,
  };
};
export default connect(mapStateToProps)(Leaderboard);
