import React from 'react';
import './GamePage.css';
import QuestionBox from './QuestionBox.js';

class GamePage extends React.Component {

  render() {
    return <Board /> ;
  }
}

class Board extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      Hexagon: Array(9).fill(null),
    }
  }*/

    render () {
      console.log("in Board")
        return (
          <div>
          <Hexagon color="hexagon-grey" number="1"/>
          <Hexagon color="hexagon-blue" number="2"/>
          </div>
        );
  }
}

class Hexagon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  handleClick() {
    this.setState({value: <QuestionBox />})
  }

  render() {
    return (
      <div className={this.props.color} onClick={ () => this.handleClick()}> <span></span>
        {this.props.number}
        {this.state.value}
      </div>
    );
  }
}

export default GamePage;
