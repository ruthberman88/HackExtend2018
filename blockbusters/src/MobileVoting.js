import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    height: "100%",
    width: "100%",
  },
});


class VotingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        statusText: "Cast your vote"
    }
  }

  vote(value) {
    console.log("voting for", value);
    fetch("/user/vote", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"value": value}),
        credentials: "include"
    }).then(
        response => response.json()
    ).then(
        function (response) {
            if (response.status == 'OK') {
                this.setState({loggedIn: true,
                               statusText: 'Your vote was cast, wait for the next round'});
            } else {
                this.setState({statusText: response.error})
            }
        }.bind(this)
    ).catch(error => console.log(error));
  }

  render() {
    var answers = [["A", "B"], ["C", "PASS"]];

    var { classes } = this.props

    return (
        <Grid container justify='center' spacing={32} style={{ marginTop: "16px" }}>
            {[0, 1].map(col => (
                <Grid item xs={12} key={col}>
                    <Grid container justify='center' spacing={8}>
                        {[0, 1].map(row => (
                            <Grid item xs={6} className={classes.button} key={row}>
                                <Grid container justify="center">
                                    <Button
                                        variant="raised"
                                        onClick={() => this.vote(answers[row][col])}>
                                            {answers[row][col]}
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Grid container justify='center'>
                    <Grid item xs={6}>
                        <Paper>{this.state.statusText}</Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
  }
}

VotingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(VotingPage);