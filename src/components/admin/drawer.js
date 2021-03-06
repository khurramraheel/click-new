import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
// import React from 'react';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class SwipeableTemporaryDrawer extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
        data:[
            {
                category:'Electronic Devices',
                 items:['Desktop','Laptops','Tablets','Mobile phones']
            }
        ]
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
        anchorEl: null,
            [side]: open,
        });
        
    };
    gotoToSubCategory = (evt)=>{

        debugger;
        this.props.target.props.history.push('/admin/categories/'+evt.target.innerText);
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    render() {
        const { classes } = this.props;
        let anchorEl =this.state.anchorEl;

        const sideList = (
            <div className={classes.list}>
                <List>
                    {this.state.data.map((text, index) => (
                        
                        <ListItem button key={text}  aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onMouseOver={this.handleClick.bind(this)}
                      >

                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text.category} />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                            {
                                    text.items.map((item)=>{
                                         return  <MenuItem onClick={this.gotoToSubCategory.bind(this)}>{item}</MenuItem>
                                    })

                            }

                            </Menu>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        

        return (
            <div>
                <Button onClick={this.toggleDrawer('left', true)}>Show Categories</Button>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
                
            </div>
        );
    }
}

SwipeableTemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
