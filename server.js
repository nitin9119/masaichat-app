const express = require("express");
var app = express();

var cors = require("cors");
const io = require("socket.io")(3002);

const users = {};

app.use(cors());

io.on("connection", (socket) => {
  //different events listening to the specific event fired from the client side

  //event listening for user connection
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  //event listenng to the chat messages
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  //event listening for user disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
