import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class GuttersGrid extends React.Component {
    state = {
        spacing: '16',
    };

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            // spacing={16}
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                        {/* {[0, 1, 2, 3].map(value => ( */}
                        <Grid item xs={3}>
                            {/* <Paper className={classes.paper} /> */}
                            <div className='deep_footer_lists'>
                                <ul className='footer_list'>
                                    <a href='#' className='list_Link'><li className='list_1'>Company</li></a>
                                    <a href='#' className='list_Link' ><li className='lists'>About Us</li></a>
                                    <a href='#' className='list_Link'><li className='lists'>Contact Us</li></a>
                                    <a href='#' className='list_Link'><li className='lists'>Suggest A Seller</li></a>
                                    <a href='#' className='list_Link'><li className='lists'>Privacy Statment</li></a>
                                </ul>
                            </div>

                        </Grid>
                        <Grid item xs={3}>
                            {/* <Paper className={classes.paper} /> */}
                            <div className='deep_footer_lists'>
                                <ul className='footer_list'>
                                    <a href='#' className='list_Link'><li className='list_1'>Merchants</li></a>
                                    <a href='#' className='list_Link' ><li className='lists'>Sell On Clicky</li></a>
                                    {/* <a href='#' className='list_Link'><li className='lists'>Contact Us</li></a>
                                      <a href='#' className='list_Link'><li className='lists'>Suggest A Seller</li></a>
                                        <a href='#' className='list_Link'><li className='lists'>Privacy Statment</li></a> */}
                                </ul>
                            </div>

                        </Grid>
                        <Grid item xs={3}>
                            {/* <Paper className={classes.paper} /> */}
                            <div className='deep_footer_lists'>
                                <ul className='footer_list'>
                                    <a href='#' className='list_Link'><li className='list_1'>Help</li></a>
                                    <a href='#' className='list_Link' ><li className='lists'>Return And Refunds</li></a>                                         <a href='#' className='list_Link'><li className='lists'>FAQ For Buyers</li></a>
                                    <a href='#' className='list_Link'><li className='lists'>FAQ For Selleers</li></a>
                                </ul>
                            </div>

                        </Grid>
                        <Grid item xs={3}>
                            {/* <Paper className={classes.paper} /> */}
                            <div className='deep_footer_lists'>
                                <h3 className='subscribe'>SUBSCRIBE TO NEWSLETTERS</h3>
                                <input type='text' />
                                <select className='list_Select_Box'>
                                    <option>Male</option>
                                    <option>FeMale</option>
                                </select>
                                <br></br>
                                <button class="button">Subscribe</button>
                            </div>

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

GuttersGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(GuttersGrid);

let NewVM = connect(function (store) {

    return {
        ndropdownHover: store.imgReducer.dropdownHover
    }

})(GuttersGrid);




// // export default NewVM;


export default withStyles(styles)(NewVM);


// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import { fade } from '@material-ui/core/styles/colorManipulator';
// import { withStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/Add';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import { Link } from 'react-router-dom';
// import logo from '../../images/logo.png';
// import mic from '../../images/mic.png'
// import store from '../../store/store'
// import { Button } from '@material-ui/core';

// const styles = theme => ({
//     root: {
//         width: '100%',
//         // backgroundColor:'gray',
//     },
//     grow: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginLeft: -12,
//         marginRight: 20,
//     },
//     title: {
//         display: 'none',
//         [theme.breakpoints.up('sm')]: {
//             display: 'block',
//         },
//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: fade(theme.palette.common.white, 0.15),
//         '&:hover': {
//             backgroundColor: fade(theme.palette.common.white, 0.25),
//         },
//         marginRight: theme.spacing.unit * 2,
//         marginLeft: 0,
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing.unit * 3,
//             width: 'auto',
//         },
//     },
//     searchIcon: {
//         width: theme.spacing.unit * 9,
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     inputRoot: {
//         color: 'inherit',
//         width: '100%',
//     },
//     inputInput: {
//         paddingTop: theme.spacing.unit,
//         paddingRight: theme.spacing.unit,
//         paddingBottom: theme.spacing.unit,
//         paddingLeft: theme.spacing.unit * 10,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('md')]: {
//             width: 200,
//         },
//     },
//     sectionDesktop: {
//         display: 'none',
//         [theme.breakpoints.up('md')]: {
//             display: 'flex',
//         },
//     },
//     sectionMobile: {
//         display: 'flex',
//         [theme.breakpoints.up('md')]: {
//             display: 'none',
//         },
//     },
// });

// class PrimarySearchAppBar extends React.Component {
//     // state = {
//     //     anchorEl: null,
//     //     mobileMoreAnchorEl: null,
//     // };

//     // handleProfileMenuOpen = event => {
//     //     this.setState({ anchorEl: event.currentTarget });
//     // };

//     // handleMenuClose = () => {
//     //     this.setState({ anchorEl: null });
//     //     this.handleMobileMenuClose();
//     // };

//     // handleMobileMenuOpen = event => {
//     //     this.setState({ mobileMoreAnchorEl: event.currentTarget });
//     // };

//     // handleMobileMenuClose = () => {
//     //     this.setState({ mobileMoreAnchorEl: null });
//     // };

//     dropdownHover = (evt) => {
//         {

//             store.dispatch({
//                 type: 'ON_HOVER',
//                 name: evt.target.innerText

//             })

//             // this.props.ndropdownHover.map((item)=>{
//             // return <div>
//             //   {item.cat}
//             // </div>  
//             // })
//         }
//     }
//     render() {
//         // const { anchorEl, mobileMoreAnchorEl } = this.state;
//         const { classes } = this.props;
//         // const isMenuOpen = Boolean(anchorEl);
//         // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//         // const renderMenu = (
//         //     <Menu
//         //         anchorEl={anchorEl}
//         //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         //         open={isMenuOpen}
//         //         onClose={this.handleMenuClose}
//         //     >
//         //         <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
//         //         <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
//         //     </Menu>
//         // );



//         // const renderMobileMenu = (
//         //     <Menu
//         //         anchorEl={mobileMoreAnchorEl}
//         //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         //         open={isMobileMenuOpen}
//         //         onClose={this.handleMenuClose}
//         //     >
//         //         <MenuItem onClick={this.handleMobileMenuClose}>
//         //             <IconButton color="inherit">
//         //                 <Badge badgeContent={4} color="secondary">
//         //                     <MailIcon />
//         //                 </Badge>
//         //             </IconButton>
//         //             <p>Messages</p>
//         //         </MenuItem>
//         //         <MenuItem onClick={this.handleMobileMenuClose}>
//         //             <IconButton color="inherit">
//         //                 <Badge badgeContent={11} color="secondary">
//         //                     <NotificationsIcon />
//         //                 </Badge>
//         //             </IconButton>
//         //             <p>Notifications</p>
//         //         </MenuItem>
//         //         <MenuItem onClick={this.handleProfileMenuOpen}>

//         //         </MenuItem>
//         //     </Menu>
//         // );

//         return (
//             <div className={classes.root}>
//                 <AppBar position="static">
//                     <Toolbar>
//                         {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
//               <MenuIcon />
//             </IconButton> */}
//                         <Typography className={classes.title} variant="h6" color="inherit" noWrap>
//                             {/* {<img src={logo} />} */}
//                             <div>
//                                 <div className='deep_footer_lists'>
//                                     <ul className='footer_list'>
//                                         <a href='#' className='list_Link'><li className='list_1'>Company</li></a>
//                                         <a href='#' className='list_Link' ><li className='lists'>About Us</li></a>
//                                         <a href='#' className='list_Link'><li className='lists'>Contact Us</li></a>
//                                         <a href='#' className='list_Link'><li className='lists'>Suggest A Seller</li></a>
//                                         <a href='#' className='list_Link'><li className='lists'>Privacy Statment</li></a>
//                                     </ul>
//                                 </div>

//                                 <div className='deep_footer_lists'>
//                                     <ul className='footer_list'>
//                                         <a href='#' className='list_Link'><li className='list_1'>Merchants</li></a>
//                                          <a href='#' className='list_Link' ><li className='lists'>Sell On Clicky</li></a>
//                                        {/* <a href='#' className='list_Link'><li className='lists'>Contact Us</li></a>
//                                         <a href='#' className='list_Link'><li className='lists'>Suggest A Seller</li></a>
//                                         <a href='#' className='list_Link'><li className='lists'>Privacy Statment</li></a> */}
//                                     </ul>
//                                 </div>

//                                 <div className='deep_footer_lists'>
//                                     <ul className='footer_list'>
//                                         <a href='#' className='list_Link'><li className='list_1'>Help</li></a>
//                                         <a href='#' className='list_Link' ><li className='lists'>Return And Refunds</li></a>
//                                         <a href='#' className='list_Link'><li className='lists'>FAQ For Buyers</li></a>
//                                         <a href='#' className='list_Link'><li className='lists'>FAQ For Selleers</li></a>
//                                     </ul>
//                                 </div>

//                                 <div className='deep_footer_lists'>
//                                     <h3 className='subscribe'>SUBSCRIBE TO NEWSLETTERS</h3>
//                                     <input type='text' /> 
//                                     <select className='list_Select_Box'>
//                                         <option>Male</option>
//                                         <option>FeMale</option>
//                                     </select>
//                                     <br></br>
//                                     <button class="button">Subscribe</button>

//                                 </div>


//                             </div>
//                         </Typography>
//                         {/* <section onMouseOver={this.dropdownHover} className='men_section'> Men </section>
//             <section className='women_section' onMouseOver={this.dropdownHover}> Women</section>
//             <section className='new_arrival' onMouseOver={this.dropdownHover}>New-Arrival</section> */}


//                         <div className={classes.grow} />

//                         <div className={classes.sectionMobile}>
//                             <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
//                                 <MoreIcon />
//                             </IconButton>
//                         </div>
//                     </Toolbar>
//                 </AppBar>
//                 {/* {renderMenu}
//                 {renderMobileMenu} */}
//             </div>
//         );
//     }
// }

// PrimarySearchAppBar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };



// let NewVM = connect(function (store) {

//     return {
//         ndropdownHover: store.imgReducer.dropdownHover
//     }

// })(PrimarySearchAppBar);




// // export default NewVM;


// export default withStyles(styles)(NewVM);