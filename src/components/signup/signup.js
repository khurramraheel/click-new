import React from "react";
import PropTypes, { func } from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import store from "../../store/store";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});
class SignUp extends React.Component {
  state = {
    name: "",
    password: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleChange = email => event => {
    this.setState({ [email]: event.target.value });
  };
  handleChange = phone => event => {
    this.setState({ [phone]: event.target.value });
  };
  handleChange = password => event => {
    this.setState({ [password]: event.target.value });
  };
  handleChange = province => event => {
    this.setState({ [province]: event.target.value });
  };
  handleChange = address => event => {
    this.setState({ [address]: event.target.value });
  };
  handleChange = city => event => {
    this.setState({ [city]: event.target.value });
  };
  handleChange = postalCode => event => {
    this.setState({ [postalCode]: event.target.value });
  };

  signUp = evt => {
    // debugger;
    evt.preventDefault();
    fetch(window.targetURL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(resp => resp.json())
      .then(resp => {
        store.dispatch({
          type: "UserSignUp",
          payload: this.state
        });
        if (resp.success) {
          alert("Signed Up Successfully");

          setTimeout(()=>{
            this.props.history.push('/signin');
          }, 1000)

        } else {
          alert("Please correct the errors in the form");
        }
      });
    console.log(this.state);
  };
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
            Sign up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="text">Enter Name</InputLabel>
              <Input
                id="name"
                name="name"
                autoFocus
                onChange={this.handleChange("name")}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                onChange={this.handleChange("email")}
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={this.handleChange("password")}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phn_No">Phone</InputLabel>
              <Input
                onChange={this.handleChange("phone")}
                name="phone"
                type="text"
                id="pNo"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phn_No">Province</InputLabel>
              <Input
                onChange={this.handleChange("province")}
                name="phone"
                type="text"
                id="pNo"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phn_No">Address</InputLabel>
              <Input
                onChange={this.handleChange("address")}
                name="phone"
                type="text"
                id="pNo"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phn_No">City</InputLabel>
              <Input
                onChange={this.handleChange("city")}
                name="phone"
                type="text"
                id="pNo"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phn_No">PostalCode</InputLabel>
              <Input
                onChange={this.handleChange("postalCode")}
                name="phone"
                type="text"
                id="pNo"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.signUp}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
