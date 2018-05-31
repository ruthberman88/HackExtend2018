import React, { Component } from 'react';
import logo from './logo.svg';
import LandingPage from './LandingPage.js'
import './App.css';


class App extends Component {
  renderLandingPage () {
    console.log('omg')
    return <LandingPage />;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
        {this.renderLandingPage()}
        </p>
      </div>
    );
  }
}

export default App;
