import React from 'react';
import './GamePage.css';

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
          <Hexagon color="hexagon-grey"/>
          <Hexagon color="hexagon-grey"/>
          </div>
        );
  }
}

class Hexagon extends React.Component {
 render () {
   console.log("in Hexagon")
   return <div className={this.props.color}><span></span>  </div>;
 }
}

export default GamePage;
