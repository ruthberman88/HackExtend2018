import React from 'react';
import './QuestionBox.css';
import Answers from './Answers'
import UserCounter from './UserCounter'

class QuestionBox extends React.Component {

  render() {
    return (
      <div className="QuestionBox">
          <Timer />
          <TeamBox />
          <Question />
          <Answers/>

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
          <div class="race-class">
            TeamBlue
            <UserCounter/>
          </div>
          <div class="race-class">
            TeamRed
            <UserCounter/>
          </div>
      </div>
    )
  }
}

export default QuestionBox;
