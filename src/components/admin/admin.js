import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from './drawer';
// import store from '../../store/store';
// import {getLoginDataAction} from '../../store/actions/getLoginDataAction/getLoginDataAction';

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


// fetch({
//     url:'/signin',
//     type:'POST',
//     headers:{
//         'Content-Type':'application/json'
//     },
//     body:JSON.strigify({
//         username:"user name here",
//         password:"password here",
//     })
// })

class Admin extends React.Component{
    constructor(){
        super();
        this.state = {
           
        }
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]:evt.target.value
        });
    }
    handleSignin = (evt) => {
        evt.preventDefault();
        if(this.state.email && this.state.password){
            // store.dispatch(getLoginDataAction(this.state));
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <main className={classes.main}>


        <Drawer target={this} />


                {/* <CssBaseline /> */}
                {/* <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">ADMIN</Typography>
         
                </Paper> */}
            </main>
        )
    }
    

}


export default withStyles(styles)(Admin);