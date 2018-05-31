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
      squares: Array(9).fill(null),
      value: "Board"
    };
  }

  handleClick() {
    this.setState({value:"QuestionBox"})
    //const squares = this.state.squares.slice();
    //this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
      value={i+1}
      onClick={() => this.handleClick()}
      />
    );
  }

  render() {
    if (this.state.value === "QuestionBox") {
      return <QuestionBox onClick ={() => this.setState({value: "Board"})}/>
    }
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


class Square extends React.Component {
  render() {
    return(
    <button className="square" onClick={this.props.onClick}>
      {this.props.value}
    </button>
    );
  }
}

export default GamePage;
