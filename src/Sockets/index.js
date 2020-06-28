import { baseUrl } from "../shared";
import socketIOClient from "socket.io-client";

export const events = {
  sendMsg: "SEND_MESSAGE",
  receiveMsg: "RECEIVE_MESSAGE"
};

let io = null;

export const authSocket = user => {
  console.log("authentication", user);
  io = socketIOClient(baseUrl);
  io.on("connect", () => {
    io.emit("authentication", user);
    io.on("authenticated", () => console.log("authentication ok"));
  });
};

export const userReceiveMsg = cb => {
  io.on(events.receiveMsg, cb);
};

export const sendMsg = message => {
  io.emit(events.sendMsg, message);
};
