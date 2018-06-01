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


class MobilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        loggedIn: false
    }
  }

  handleUserName(ev) {
    this.setState({user: ev.target.value});
  }

  joinTeam(team) {
    console.log("User", this.state.user, "joins team", team);
    fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"user": this.state.user, "team": team}),
        credentials: "include"
    }).then(
        response => response.json()
    ).then(
        response => (
            response.status == 'OK' ?
                this.setState({loggedIn: true}) :
                alert(response.error)
        )
    ).catch(error => console.log(error));
    this.setState({loggedIn: true});
  }

  render() {
    const {classes} = this.props

    if (this.state.loggedIn) {
        return <Redirect to="/player/voting" />
    }

    return (
        <Grid container className={classes.root} justify="center" spacing={16}>
            <Grid item xs={12} style= {{ "marginTop": "16px" }}>
                <Grid container justify="center">
                    <Input
                        placeholder="User name"
                        onChange={this.handleUserName.bind(this)} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={8}>
                    <Grid item xs={4}>
                        <Button className={classes.button} variant="raised" color="primary" onClick={() => this.joinTeam("blue")}>
                            blue
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.button} variant="raised" color="secondary" onClick={() => this.joinTeam("red")}>
                            red
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
  }
}

MobilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MobilePage);
