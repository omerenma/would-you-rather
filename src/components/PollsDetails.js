import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Image, Card } from "semantic-ui-react";
import { handleAddAnswer } from "../actions/questions";
import Appbar from "./Appbar";

const styles = {
  backgroundColor: "red",
  backgroundColor2: "purple",
};
class PollsDetails extends Component {
  state = {
    option: "",
  };
  handleOptionOne = () => {
    this.setState({
      option: "optionOne",
    });
  };
  handleOptionTwo = () => {
    this.setState({ option: "optionTwo" });
  };
  render() {
    const { option } = this.state;
    console.log(option, "options");
    const { users, questions } = this.props;
    const questionId = this.props.match.params.id.substring(3);
    if (questions[questionId] === undefined) {
      return <Redirect to="/NotFound" />;
    } else console.log(questions[questionId], "check");
    const name = users[questions[questionId].author].name;
    const avatar = users[questions[questionId].author].avatarURL;
    const option1 = questions[questionId].optionOne.text;
    const option2 = questions[questionId].optionTwo.text;

    const vote1 = questions[questionId].optionOne.votes.length;
    const vote2 = questions[questionId].optionTwo.votes.length;

    const totalVotes = vote1 + vote2;
    const percentageOfVote1 = (vote1 * 100) / totalVotes;
    const roundedPercentageOfVote1 = Math.trunc(percentageOfVote1);

    const percentageOfVote2 = (vote2 * 100) / totalVotes;
    const roundedPercentageOfVote2 = Math.trunc(percentageOfVote2);

    const voteOfUsers1 = questions[questionId].optionOne.votes.includes(
      this.props.authedUserId
    );
    const voteOfUsers2 = questions[questionId].optionTwo.votes.includes(
      this.props.authedUserId
    );

    console.log(option, "option");

    return (
      <div style={{ margin: " 100px" }}>
        <Appbar />
        <Card>
          <div style={{ margin: "0 auto" }}>
            <Image src={avatar} size="tiny" style={{ width: 100 }} />
          </div>
          <Card.Content>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Card.Meta>
                <span className="date">
                  <p>{name}</p>
                </span>
                <span className="date">
                  <h3>Would You Rather...</h3>
                </span>
              </Card.Meta>
              {voteOfUsers1 || voteOfUsers2 ? (
                <React.Fragment>
                  <div>Results:</div>
                  <div>
                    <div>
                      {option1}:{roundedPercentageOfVote1}%
                    </div>
                    <div>votes:{vote1}</div>
                  </div>

                  <div>
                    <div>
                      {option2}:{roundedPercentageOfVote2}%
                    </div>
                    <div>Votes:{vote2}</div>
                  </div>
                  <div>Opinion Poll {voteOfUsers1 ? "1" : "2"}</div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    onClick={this.handleOptionOne}
                    className={
                      this.state.option === "optionOne"
                        ? styles.backgroundColor
                        : ""
                    }
                  >
                    {option1}
                  </Button>
                  <p style={{ margin: "0 auto", position: "relative", top: 5 }}>
                    OR
                  </p>
                  <Button
                    onClick={this.handleOptionTwo}
                    className={
                      this.state.option === "optionTwo"
                        ? styles.backgroundColor2
                        : ""
                    }
                  >
                    {option2}
                  </Button>
                  <Button
                    onClick={() => {
                      if (!this.state.option) {
                        return null
                      }
                      this.props.dispatch(handleAddAnswer(option, questionId));
                    }}
                  >
                    Submit Opinion
                  </Button>
                </React.Fragment>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ users, questions, auth }) => {
  return {
    authedUserId: auth.id,
    users,
    questions,
  };
};

export default connect(mapStateToProps)(PollsDetails);
