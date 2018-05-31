import React from 'react';
import './LandingPage.css';
import UserCounter from './UserCounter.js'

class LandingPage extends React.Component {

  render() {
    console.log("LandingPage")
    console.log(this)
    return (
      <div className="LandingPage">
          This is the link you need
          <TeamBox />
          <TeamBox />
          <StartButton onClick={this.props.onClick}/>
      </div>
    );
  }
}

class TeamBox extends React.Component {
  render() {
    return(
      <div>
        This is the teambox
        Counter:
        <UserCounter />
      </div>
    )
  }
}

class StartButton extends React.Component {
  render() {
    console.log("start button")
    console.log(this)
    return (
      <button className="startButton" onClick={this.props.onClick}>
      </button>
    );
  }
}

export default LandingPage;
