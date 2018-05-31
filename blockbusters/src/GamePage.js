import React from 'react';
import './GamePage.css';
import QuestionBox from './QuestionBox.js';

class GamePage extends React.Component {

  render() {
    return <Board /> ;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: <Hexagon color="hexagon-grey" number="1" onClick={() => this.handleClick()} />
    }
  }

  handleClick(){
    this.setState({value: <QuestionBox/>})
  }

    render () {
      console.log("in Board")
        return (
          <div>
            {this.state.value}
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

  render() {
    return (
      <div className={this.props.color} onClick={this.props.onClick}> <span></span>
        {this.props.number}
        {this.state.value}
      </div>
    );
  }
}

export default GamePage;
