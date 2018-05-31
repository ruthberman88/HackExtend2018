import React from 'react';
import logo from './logo.svg';
import './LandingPage.css';
import UserCounter from './UserCounter.js'

class LandingPage extends React.Component {

  render() {
    return (
      <div className="LandingPage">
        <p className="App-intro">
          This is the link you need
          <TeamBox />
          <TeamBox />
          <StartButton />
        </p>
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
    return (
      <button className="startButton" onClick={() => alert('click')}>
      </button>
    );
  }
}

export default LandingPage;
