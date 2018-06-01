import React from 'react';
import './QuestionBox.css';
import UserCounter from './UserCounter'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReactCountdownClock from 'react-countdown-clock'


const questions = [
    {
        q: 'How many pizzas were ordered?',
        a: {
            A: '100',
            B: '53',
            C: '42'
        },
        correct: 'B'
    },
    {
        q: "How many mentors participated in this year's hackathon?",
        a: {
            A: 'asd',
            B: 'asd',
            C: 'asd'
        },
        correct: 'C'
    },
    {
        q: 'What is the address of this building?',
        a: {
            A: 'Ben Yehuda 32',
            B: 'Hayarkon 32',
            C: 'Bugrashov 32'
        },
        correct: 'A'
    },
    {
        q: 'Where is the farthest place someone came from to this event',
        a: {
            A: 'Kfar Yasif',
            B: 'Kahal',
            C: 'Haniel'
        },
        correct: 'B'
    },
    {
        q: 'When was the last hack extend hackathon?',
        a: {
            A: 'May 2017',
            B: 'August 2017',
            C: 'September 2016'
        },
        correct: 'C'
    },
    {
        q: 'Where was the last hack extend hackathon?',
        a: {
            A: 'WIX hub',
            B: 'Google campus',
            C: 'Beit Hatfutsot'
        },
        correct: 'C'
    },
    {
        q: 'Who is NOT a sponsor of this event?',
        a: {
            A: 'Smore',
            B: 'ironSource',
            C: 'ZenCity'
        },
        correct: 'B'
    },
    {
        q: 'What was the largest hackathon shirt size?',
        a: {
            A: 'XXL',
            B: 'XL',
            C: 'L'
        },
        correct: 'A'
    },
    {
        q: 'What is the code to the bathroom?',
        a: {
            A: '1006*',
            B: '1106#',
            C: '1116#'
        },
        correct: 'B'
    },
    {
        q: 'How many projects were presented today?',
        a: {
            A: '20',
            B: '17',
            C: '12'
        },
        correct: 'B'
    },
    {
        q: 'What were the colors of the balloons before they flew away?',
        a: {
            A: 'Red, Yellow, Green',
            B: 'Purple, Yellow, Blue',
            C: 'Blue, Purple, Orange'
        },
        correct: 'B'
    },
    {
        q: 'What is the number 3?',
        a: {
            A: '1',
            B: '1.5',
            C: '3'
        },
        correct: 'C'
    },
    {
        q: 'How many meals did we have during this hackathon?',
        a: {
            A: '5',
            B: '4',
            C: '7'
        },
        correct: 'A'
    },
    {
        q: 'What is the most common WiFi password in this room?',
        a: {
            A: 'Fortinet',
            B: 'ONEWORDALLCAPS',
            C: 'choochoo'
        },
        correct: 'C'
    },
    {
        q: 'How many participants took part in this event?',
        a: {
            A: '~100',
            B: '~70',
            C: '~120'
        },
        correct: 'B'
    },
    {
        q: 'Can you see the sea from the roof?',
        a: {
            A: 'yes',
            B: 'no',
            C: 'maybe'
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
      winner: "black"
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
    this.intervalId = setInterval(() => this.goBack(), 3000);

    var newStyles = Object.assign({}, this.state.additionalStyle);
    newStyles[this.state.correctAnswer] = {...newStyles[this.state.correctAnswer], backgroundColor: "green"};

    this.setState({additionalStyle: newStyles});
  }


  showTeamAnswers() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.showCorrectAnswer(), 2000);

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
                winner: winner
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
      <Grid container justify='center' spacing={32}>
        <Grid item xs={12}>
            <div style={{ minHeight: "20px" }} />
        </Grid>
        <Grid item xs={12}>
            <Grid container justify='center'>
                <Grid item xs={12}>
                    <Question text={this.state.question} />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container justify='center' spacing={16}>
                {Object.keys(this.state.answers).map((key, index) => (
                    <Grid item xs={4} key={key}>
                        <div className="Answer" key={key} style={this.state.additionalStyle[key]}>{key}. {this.state.answers[key]}</div>
                    </Grid>
                ))}
            </Grid>
        </Grid>
        <ReactCountdownClock seconds={10} size={200} style={{ margin: "0 auto" }}/>
      </Grid>
    );
  }
}

class Question extends React.Component {
  render () {
    return <h1 className="Question"> {this.props.text} </h1>;
  }
}


export default QuestionBox;
