
// import React from 'react';
// import PropTypes, { func } from 'prop-types';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import withStyles from '@material-ui/core/styles/withStyles';
// import store from '../../store/store';


// const styles = theme => ({
//   main: {
//     width: 'auto',
//     display: 'block', // Fix IE 11 issue.
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: 400,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
//   },
//   avatar: {
//     margin: theme.spacing.unit,
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing.unit,
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3,
//   },
// });
// class Checkout extends React.Component {


//   state = {
//     firstname: '',
//     lastname: '',
//     email: '',
//     phone: '',
//     address:'',
//     postalCode:'',
//     city:'',
//     province:'',


//   };

//   handleChange = firstname => event => {
//     this.setState({ [firstname]: event.target.value });
//   };
//   handleChange = email => event => {
//     this.setState({ [email]: event.target.value });
//   };
//   handleChange = phone => event => {
//     this.setState({ [phone]: event.target.value });
//   };
//   handleChange = lastname => event => {
//     this.setState({ [lastname]: event.target.value });
//   };

 

//   checkout = (evt) => {
//     // debugger;
//     evt.preventDefault();
//     fetch('/checkout', {
//       method: "POST",
//       headers: {
//         "Content-Type": 'application/json'
//       },
//       body: JSON.stringify(this.state)
//     }).then((resp) => {
//       store.dispatch({
//         type: "USER_CHECKOUT",
//         payload: this.state,
//       });
//       if (resp) {

//         alert('Order Confirmed')
//       }
//     });
//     console.log(this.state);




//   }
//   render() {
//     const { classes } = this.props;
//     return (
//       <main className={classes.main}>
//         <CssBaseline />
//         <Paper className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Confirm your Details
//         </Typography>
//           <form className={classes.form}>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="text">Enter Your FirstName</InputLabel>
//               <Input id="name" name="name" autoFocus onChange={this.handleChange('firstname')} />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="email">Email Address</InputLabel>
//               <Input onChange={this.handleChange('email')} id="email" name="email" autoComplete="email" autoFocus />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="password">Entour Your LastName</InputLabel>
//               <Input onChange={this.handleChange('lastname')} name="password" type="text" id="password" />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="phn_No">Phone</InputLabel>
//               <Input onChange={this.handleChange('phone')} name="phone" type="text" id="pNo"/>
//             </FormControl>
            
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//               onClick={this.checkout}
//             >
//               Submit Your Order
//           </Button>
//           </form>
//         </Paper>
//       </main>
//     );
//   }
// }

// Checkout.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Checkout);