import React from 'react';
import './QuestionBox.css';
import UserCounter from './UserCounter'
import Button from '@material-ui/core/Button';


const questions = ["Where is Pusheen!", "Where is Pusheen!!!", "Pusheen", "Wis Pusheen", "re is Pusheen",
                   "Where is Pusheen!!", "Where is Pusheen!!!!", "is Pusheen" ,"Wre is Pusheen"]


class QuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: questions[props.question],
      answers: {
        "A": "here",
        "B": "there",
        "C": "everywhere",
      },
      correctAnswer: "A",
      additionalStyle: {
        "A": {},
        "B": {},
        "C": {}
      },
      winner: "black"
    }
  }


  getAnswer() {
    // TODO: ask backend
    return {"blue": "A",
            "red": "A"}
  }

  goBack() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.props.onClick(this.state.winner);
  }

  showCorrectAnswer() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.goBack(), 3000);

    var newStyles = Object.assign({}, this.state.additionalStyle);
    newStyles[this.state.correctAnswer] = {...newStyles[this.state.correctAnswer], backgroundColor: "green"};

    this.setState({additionalStyle: newStyles});
  }


  showTeamAnswers() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.showCorrectAnswer(), 3000);

    var answer = this.getAnswer();

    var newStyles = Object.assign({}, this.state.additionalStyle);
    newStyles[answer["blue"]] = {...newStyles[answer["blue"]], borderTopColor: "blue"};
    newStyles[answer["red"]] = {...newStyles[answer["red"]], borderBottomColor: "red"};

    var currTeam = ["blue", "red"][this.props.team];
    var otherTeam = ["red", "blue"][this.props.team];
    var winner = this.state.winner;
    if (answer[currTeam] == this.state.correctAnswer) {
        winner = currTeam;
    } else if (answer[otherTeam] == this.state.correctAnswer) {
        winner = otherTeam
    }

    this.setState({
        additionalStyle: newStyles,
        winner: winner
    })
  }

  componentDidMount() {
    //this.intervalId = setInterval(() => this.showTeamAnswers(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="QuestionBox">
          <Question text={this.state.question} />
          {Object.keys(this.state.answers).map((key, index) => (
            <div className="Answer" key={key} style={this.state.additionalStyle[key]}>{key}. {this.state.answers[key]}</div>
          ))}
          <Button variant="raised" color="primary" onClick={() => this.showTeamAnswers()}>
                Time is up
          </Button>

      </div>
    );
  }
}

class Question extends React.Component {
  render () {
    return <div className="Question"> {this.props.text} </div>;
  }
}


export default QuestionBox;
