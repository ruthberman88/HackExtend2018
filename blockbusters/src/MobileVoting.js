import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
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
    }
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
                                    <Button variant="raised" >{answers[row][col]}</Button>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
  }
}

VotingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(VotingPage);