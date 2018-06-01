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
      squares: Array(16).fill("gray"),
      currTeam: 0,
      currSquare: null,
      value: "Board"
    };
  }

  handleClick(i) {
    //const squares = this.state.squares.slice();
    //squares[i] = this.state.currTeam;
    this.setState({
        value: "QuestionBox",
        currTeam: 1 - this.state.currTeam,
        currSquare: i
    })

    // this.setState({squares: squares});
  }

  handleReturnFromQuestion(winningTeam) {
    const squares = this.state.squares.slice();
    squares[this.state.currSquare] = winningTeam;
    this.setState({
        value: "Board",
        squares: squares
    });
  }

  renderSquare(i) {
    return (
      <Square
      color={this.state.squares[i]}
      value={i+1}
      onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    if (this.state.value === "QuestionBox") {
      return <QuestionBox
                question={this.state.currSquare}
                team={this.state.currTeam}
                onClick={(winningTeam) => this.handleReturnFromQuestion(winningTeam)}/>
    }
    var nextTeamName = ["red", "blue"][this.state.currTeam];
    return (
      <div>
          <div className="LandingPage-title" style={{ backgroundColor: nextTeamName }}>
            next team is {nextTeamName}
          </div>
          <div className="frame">
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              {this.renderSquare(3)}
            </div>
            <div className="board-row">
              {this.renderSquare(4)}
              {this.renderSquare(5)}
              {this.renderSquare(6)}
              {this.renderSquare(7)}
            </div>
            <div className="board-row">
              {this.renderSquare(8)}
              {this.renderSquare(9)}
              {this.renderSquare(10)}
              {this.renderSquare(11)}
            </div>
            <div className="board-row">
              {this.renderSquare(12)}
              {this.renderSquare(13)}
              {this.renderSquare(14)}
              {this.renderSquare(15)}
            </div>
          </div>
      </div>
    );
  }
}


class Square extends React.Component {
  render() {
    var myStyle = {
        backgroundColor: this.props.color
    }
    return(
    <button className="square" onClick={this.props.onClick} style={myStyle}>
      {this.props.value}
    </button>
    );
  }
}

export default GamePage;
