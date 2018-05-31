import React from 'react';
import './Answers.css';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {
        "A": {"text": "here", "color": "Answer"},
        "B": {"text": "there", "color": "Answer"},
        "C": {"text": "everywhere", "color": "Answer"},
    }
    }
  }

  handleThing() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.setState({
        answers: {...this.state.answers,
                  A: {...this.state.answers.A,
                      color: "TeamBlueAnswer"}}
    });
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.handleThing(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }


  render() {
    var answers = this.state.answers;

    return (
      <div>
        {Object.keys(answers).map((ans, index) => (
            <Answer key={ans} lable={ans} text={answers[ans].text} color={answers[ans].color} />
        ))}
      </div>
    );
  }
}

class Answer extends React.Component {
  render (){
    return (
      <div className={this.props.color} style={{border: "10px solid blue"}}>
      {this.props.lable}. {this.props.text}
      </div>
    );
  }
}

export default Answers;
