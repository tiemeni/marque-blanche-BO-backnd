const { Server } = require("socket.io");

let io = null;

exports.io = function () {
  return io;
};

exports.initialize = function (server) {
  io = new Server(server);
  return io;
};
