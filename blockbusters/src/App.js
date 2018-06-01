import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './LandingPage.js';
import GamePage from './GamePage.js';
import MobilePage from './MobilePage.js';
import VotingPage from './MobileVoting.js'
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
    console.log()
    console.log("App")
    console.log(this)
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" render={() => this.state.value} />
                <Route exact path='/player' component={MobilePage} />
                <Route exact path='/player/voting' component={VotingPage} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
