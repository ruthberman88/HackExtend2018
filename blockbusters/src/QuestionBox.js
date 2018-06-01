import React from 'react';
import './QuestionBox.css';
import Answers from './Answers'
import UserCounter from './UserCounter'
import Button from '@material-ui/core/Button';

class QuestionBox extends React.Component {

  getAnswer() {
    // TODO: ask backend
    return {"blue": "a",
            "red": "b"}
  }

  showAnswer() {
    // answer = this.getAnswer();
    this.props.onClick("blue");
  }

  render() {
    return (
      <div className="QuestionBox">
          <Timer />
          <TeamBox />
          <Question />
          <Answers/>
          <Button variant="raised" color="primary" onClick={() => this.showAnswer()}>
                Time is up
          </Button>

      </div>
    );
  }
}

class Timer extends React.Component {
  render () {
    return <div> This is the timer </div>
  }
}

class Question extends React.Component {
  render () {
    return <div> Where is Pusheen? </div>;
  }
}

class TeamBox extends React.Component {
  render() {
    return(
      <div id="wrap">
          <div className="race-class">
            TeamBlue
            <UserCounter/>
          </div>
          <div className="race-class">
            TeamRed
            <UserCounter/>
          </div>
      </div>
    )
  }
}

export default QuestionBox;
