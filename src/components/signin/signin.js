import React from 'react';
import PropTypes, { func } from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import store from '../../store/store';


window.signincomponent = {setState:()=>
  {

  }};

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
class SignIn extends React.Component {


  state = {
    password: '1234567',
    email: '',
    value:'s@f',
    pass:'ss'
  };
 componentDidMount = ()=>{
  window.signincomponent= this;
 }
  handleChange = email => event => {
    this.setState({ [email]: event.target.value });
  };
  handleChange = password => event => {
    this.setState({ [password]: event.target.value });
  };
  signin = (event) => {

    event.preventDefault();
    store.dispatch({
      type: "USER_LOGIN_STARTED",
    });
    fetch(window.targetURL+'/signin', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(this.state)
    }).then((resp) => {
      store.dispatch({
        type: "USER_LOGIN_DONE"
      });
      resp.json().then((data) => {
        console.log(data)
        if (data._id) {

          localStorage.setItem('logged_user', JSON.stringify(data));

          store.dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data
          })
        } else {
          store.dispatch({
            type: "USER_LOGIN_FAILED",
            payload: data
          });
        }
        if (data._id) {
          this.props.history.push('/')
        }
        else{
          this.props.history.push('/signin')
        }
      })
    });

  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
        </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input onChange={this.handleChange('email')} id="email"  name="email" autoComplete="email"  />
              
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={this.handleChange('password')} name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <Button
            id="signINBTN"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.signin}
            >
              Sign In
          </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);