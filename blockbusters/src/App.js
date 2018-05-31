import React, { Component } from 'react';
import LandingPage from './LandingPage.js'
import GamePage from './GamePage.js'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: <LandingPage onClick={() => this.handleClick()}/>
    };
  }

  handleClick() {
    this.setState({value: <GamePage/>})
  }

  render() {
    console.log("App")
    console.log(this)
    return this.state.value;
  }
}

export default App;
