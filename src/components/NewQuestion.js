import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { handleAddQuestion } from "../actions/questions";
import Appbar from "./Appbar";
class Newquestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  };
  handleQuetion = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.dispatch(handleAddQuestion(optionOne, optionTwo));
    this.props.history.push("/home");
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: "20px" }}>
          <Appbar />
        </div>
        <div style={{ margin: "10% 5%" }}>
          <h1>Add New Question</h1>
          <form>
            <div>
              <input
                style={{ width: 300, marginTop: 10 }}
                type="text"
                placeholder="Question 1"
                name="optionOne"
                value={this.state.optionOne}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                style={{ width: 300, marginTop: 10 }}
                type="text"
                placeholder="Question 2"
                name="optionTwo"
                value={this.state.optionTwo}
                onChange={this.handleChange}
              />
            </div>
            <div>
              {/* <Button
              component={Link}
              to="/home"
                style={{ width: 300, marginTop: 10 }}
                onClick={this.handleQuetion}
              >
                Submit
              </Button> */}
              <input
                style={{ width: 300, marginTop: 10 }}
                type="submit"
                value="Submit"
                onClick={this.handleQuetion}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};
export default withRouter(connect(mapStateToProps)(Newquestion));
