const Messages = require("../db/models/Messages");
const events = {
  sendMsg: "SEND_MESSAGE",
  sendErr: "SEND_ERROR",
  receiveMsg: "RECEIVE_MESSAGE"
};

// send message callback.........................>
const sendMsg = message => {
  console.log(message);
  Messages.findOne({ user: message.user }, (err, box) => {
    if (err) return socket.emit(events.sendErr, { message: err.message });
    if (!box) {
      Messages.create(
        { user: message.user, messages: [message] },
        (err, box) => {
          if (err) return console.log(err);
          console.log("message stored", box);
        }
      );
    } else {
      box.messages.push(message);
      box.save(err => {
        console.log(message);
        if (err) return console.log(err);
        if (message.role === "admin") {
          onlineUsers.forEach(user => {
            if (user._id === message.user) {
              user.socket.emit(events.receiveMsg, message);
            }
          });
        } else {
          onlineUsers.forEach(user => {
            if (user.role === "admin") {
              user.socket.emit(events.receiveMsg, message);
            }
          });
        }
      });
    }
  });
};
// .......................................................>
const onlineUsers = [];
const postAuthenticate = (socket, user) => {
  if (!onlineUsers.find(u => u._id === user._id)) {
    onlineUsers.push({ ...user, socket });
  }
  socket.on(events.sendMsg, sendMsg);
};

module.exports = postAuthenticate;
