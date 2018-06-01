import React from 'react';
import './QuestionBox.css';
import UserCounter from './UserCounter'
import Button from '@material-ui/core/Button';


const questions = [
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },
    {
        q: 'my question',
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'A'
    },

]


class QuestionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: questions[props.question].q,
      answers: questions[props.question].a,
      correctAnswer: questions[props.question].correct,
      additionalStyle: {
        "A": {},
        "B": {},
        "C": {}
      },
      winner: "black",
      gotAnswer: false
    }
  }


  getAnswer() {
    return fetch('/question/finish').then(res => res.json())
  }

  goBack() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.props.onClick(this.state.winner);
  }

  showCorrectAnswer() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    //this.intervalId = setInterval(() => this.goBack(), 3000);

    var newStyles = Object.assign({}, this.state.additionalStyle);
    newStyles[this.state.correctAnswer] = {...newStyles[this.state.correctAnswer], backgroundColor: "green"};

    this.setState({additionalStyle: newStyles});
  }


  showTeamAnswers() {
    console.log('showTeamAnswers called');
    if (this.state.gotAnswer) {
        return this.goBack();
    }

    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.showCorrectAnswer(), 3000);

    this.getAnswer().then(
        function(response) {
            var answer = response.response;
            console.log("got answer", answer);
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
                winner: winner,
                gotAnswer: true
            })
        }.bind(this)
    )
  }

  componentDidMount() {
    fetch("/question/begin").then(function(res) {
        console.log('called begin question, you have 10 seconds');
        this.intervalId = setInterval(() => this.showTeamAnswers(), 10000);
    }.bind(this));
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
