import React from 'react';
import './LandingPage.css';
import UserCounter from './UserCounter.js'
import Button from '@material-ui/core/Button';

class LandingPage extends React.Component {

  render() {
    console.log("LandingPage")
    console.log(this)
    return (
    <div>
      <div className="LandingPage">
        <p className="LandingPage-title">
          This is the link you need to go to
        </p>
        <p className="LandingPage-link">
          https://d7ca3384.ngrok.io/player
        </p>
        <p className = "LandingPage-text">
          Please choose a team using your phone and then click start
        </p>
      </div>

      <div className="LandingPage-frame">
        <TeamBox color="LandingPage-teamBox-blue" name="blue"/>
        <TeamBox color="LandingPage-teamBox-red" name="red"/>
      </div>
      <div className="startButton">
        <StartButton onClick={this.props.onClick}/>
      </div>
    </div>
    );
  }
}

class TeamBox extends React.Component {
  render() {
    return(
      <div className = {this.props.color}>
      {this.props.name}
      </div>
    )
  }
}

class StartButton extends React.Component {
  render() {
    console.log("start button")
    console.log(this)
    return (
      <Button variant="raised" color="primary" onClick={this.props.onClick}>
      Start Game
      </Button>
    );
  }
}

export default LandingPage;
