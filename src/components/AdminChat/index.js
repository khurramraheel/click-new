import React from "react";
import { baseUrl } from "../../shared";
import ChatBox from "./ChatBox";
import { authSocket, userReceiveMsg } from "../../Sockets";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  root: {
    width: "300px"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "300px",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 300
  }
}));

class AdminChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      selectedBox: null,
      isChatBoxOpen: false
    };
  }

  componentDidMount() {
    authSocket(this.props.user);
    userReceiveMsg(msg => {
      if (msg.isBox) {
        this.setState(st => ({ messages: [msg, ...st.messages] }));
      } else {
        const messages = this.state.messages.map(box => {
          if (box.user._id === msg.user) {
            box.messages.push(msg);
          }
          return box;
        });
        this.setState({ messages });
      }
    });
    fetch(baseUrl + "messages/")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const err = new Error(res.status + " : " + res.statusText);
        throw err;
      })
      .then(res => {
        console.log(res.messages);
        debugger;
        this.setState({ messages: res.messages });
      })
      .catch(err => alert(err.message));
  }
  sendMessage = msg => {
    const messages = this.state.messages.map(box => {
      if (box.user._id === msg.user) {
        box.messages.push(msg);
      }
      return box;
    });
    this.setState({ messages });
  };
  rowClickHandler = box => {
    this.setState({ selectedBox: box, isChatBoxOpen: true });
  };
  closeChat = () => this.setState({ isChatBoxOpen: false });

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">Index</TableCell>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="right">Messages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.messages.map((box, index) => (
                <TableRow
                  hover={true}
                  onClick={() => this.rowClickHandler(box)}
                  key={box._id}
                >
                  <TableCell>{1 + index}</TableCell>
                  <TableCell align="center" >{box.user.name}</TableCell>
                  <TableCell align="right">{box.messages.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {this.state.isChatBoxOpen && (
          <ChatBox
            sendMessage={this.sendMessage}
            user={this.props.user}
            closeChat={this.closeChat}
            isOpen={this.state.isChatBoxOpen}
            box={this.state.selectedBox}
          />
        )}
      </div>
    );
  }
}
export default withStyles(styles)(AdminChat);
