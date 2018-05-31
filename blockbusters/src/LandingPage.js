import React from 'react';
import logo from './logo.svg';
import './LandingPage.css';

class App extends React.Component {
  renderTeamBox {
    return <TeamBox />;
  }
  render() {
    return (
      <div className="LandingPage">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BlockBusters!</h1>
        </header>
        <p className="App-intro">
          This is the link you need
        </p>
      </div>
      <div>
      {this.renderTeamBox}
      {this.renderTeamBox}
      </div>
    );
  }
}

class TeamBox extends React.Component {
  render(){
    <p>
    "This is the teambox"
    </p>
  }

}
/*export default App;
