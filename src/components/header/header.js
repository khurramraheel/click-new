import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from '@material-ui/icons/Add';
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
// import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import mic from "../../images/mic.png";
import store from "../../store/store";
import cart from "../../images/cart.png";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    auth: true,
    mobileMoreAnchorEl: null,
    open: false
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  logout = () => {
    this.handleClose();
    store.dispatch({
      type: "USER_LOGOUT",
      history: this.props.history
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false
    });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  dropdownHover = evt => {
    {
      store.dispatch({
        type: "ON_HOVER",
        name: evt.target.innerText
      });
    }
  };
  performSearch = evt => {
    if (evt.keyCode == "13") {
      this.props.history.push("/search/" + evt.target.value);
      // window.location.href = '/search';
    }
  };

  render() {
    const { fullScreen } = this.props;
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const open = Boolean(anchorEl);

    // const renderMenu = (
    // <Menu
    //   anchorEl={anchorEl}
    //   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //   open={isMenuOpen}
    //   onClose={this.handleMenuClose}
    // >
    //   <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
    //   <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
    // </Menu>
    // );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen} />
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton> */}
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
             <Link to='/'> {<img class="main-logo" src={logo} />}</Link>
            </Typography>
              <Link to="/categories/Men">
            <section onMouseOver={this.dropdownHover} className='men_section' >
                 Men
               </section>
               </Link>
              <Link to="/categories/Women">
            <section className='women_section' onMouseOver={this.dropdownHover}>
                 Women
              </section>
              </Link>
              <Link to="/categories/Kids">
            <section className='kids_section' onMouseOver={this.dropdownHover}>
                Kids
                </section>
                </Link>
                <Link to='/'>                
                <section className='kids_section' onMouseOver={this.dropdownHover}>
                Home
                </section>
                </Link>
              {/* <Link to="/categories/NewArrivals">
            <section className='new_arrival' onMouseOver={this.dropdownHover}>
                New-Arrival
                </section>
                </Link> */}

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onKeyDown={this.performSearch.bind(this)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <div>
                <div>
                  <span class="loggedInUser">{this.props.userData.name}</span>
                {this.props.userData._id && 
                  (<span className="cart-items">{this.props.ncartInfo.length}</span>)
                   }
                  {this.props.userData._id && (
                    <img
                      id="cartIcon"
                      src={cart}
                      className="cart"
                      onClick={this.handleClickOpen}
                    />
                  )}
                </div>
                <Dialog
                  fullScreen={fullScreen}
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogContent>
                    <DialogContentText>
                      {this.props.ncartInfo.map(item => {
                        return (
                          <div>
                            <div>Price : {item.price}</div>
                            <div>Description : {item.description}</div>
                          </div>
                        );
                      })}
                      {/* {console.log(this.props.ncartInfo)} */}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <div hidden={this.props.userData._id}>
                      <h4>Cart is empty!</h4>
                    </div>

                    <div hidden={!this.props.userData._id}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.handleClose}
                      >
                        <Link to="/cart" className="signUp cart_btn">
                          View Cart
                        </Link>
                      </Button>

                      <Button onClick={this.handleClose} color="primary">
                        Continue Shopping
                      </Button>
                    </div>
                  </DialogActions>
                </Dialog>
              </div>

              <Toolbar>
                <div>
                  {this.props.userData.role === "admin" && (
                    <Link style={{ color: "#fff" }} to="inbox">
                      <IconButton color="inherit">
                        <MailIcon />
                      </IconButton>
                    </Link>
                  )}
                  <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>My orders</MenuItem>
                    {/* <MenuItem onClick={this.handleClose}>Return Requests</MenuItem> */}
                    <MenuItem onClick={this.handleClose}>Wish List</MenuItem>
                    {this.props.userData._id && (
                      <MenuItem id="logout_icon" onClick={this.logout}>Logout</MenuItem>
                    )}

                    {!this.props.userData._id ? (
                      <>
                        <MenuItem>
                          <Link to="/signin" className="signUp">
                            Sign In
                            <IconButton
                              aria-owns={
                                isMenuOpen ? "material-appbar" : undefined
                              }
                              aria-haspopup="true"
                              // onClick={this.handleProfileMenuOpen}
                              color="inherit"
                            />
                          </Link>
                        </MenuItem>

                        <MenuItem hidden={this.props.userData._id}>
                          <Link to="/signup" className="signUp">
                            Register
                            <IconButton
                              aria-owns={
                                isMenuOpen ? "material-appbar" : undefined
                              }
                              aria-haspopup="true"
                              // onClick={this.handleProfileMenuOpen}
                              color="inherit"
                            />
                          </Link>
                        </MenuItem>
                      </>
                    ) : null}
                  </Menu>
                </div>
              </Toolbar>

              <span>
                <img className="mic_image" src={mic} />
              </span>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {/* {renderMenu} */}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

let NewVM = connect(function(store) {
  return {
    ndropdownHover: store.imgReducer.dropdownHover,
    userData: store.authReducer.UserSignUp.data,
    ncartInfo: store.authReducer.cartInfo
  };
})(PrimarySearchAppBar);

// export default NewVM;

export default withRouter(withStyles(styles)(NewVM));
