import React from 'react';
import './Answers.css';

class Answers extends React.Component {
  render() {
    return (
      <div>
        <Answer lable="A. " text="Here"/>
        <Answer lable="B. " text="There"/>
        <Answer lable="C. " text="Everywhere"/>
      </div>
    );
  }
}

class Answer extends React.Component {
  render (){
    return (
      <div className="Answer">
      {this.props.lable}
      {this.props.text}
      </div>
    );
  }
}

export default Answers;
