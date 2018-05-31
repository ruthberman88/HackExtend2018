import React from 'react';
import './LandingPage.css';
import UserCounter from './UserCounter.js'
import Button from '@material-ui/core/Button';

class LandingPage extends React.Component {

  render() {
    console.log("LandingPage")
    console.log(this)
    return (
      <div className="LandingPage">
          <p className="LandingPage-link">
            This is the link you need
          </p>
          <p className = "LandingPage-text">
            Please choose a team using your phone
          </p>
          <TeamBox color="LandingPage-teamBox-blue"/>
          <TeamBox color="LandingPage-teamBox-red"/>
          <StartButton onClick={this.props.onClick}/>
      </div>
    );
  }
}

class TeamBox extends React.Component {
  render() {
    return(
      <div className = {this.props.color}>
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
      <Button variant="raised" color="primary" onClick={this.props.onClick}>
      Start Game
      </Button>
    );
  }
}

export default LandingPage;
