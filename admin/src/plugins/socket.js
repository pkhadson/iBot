import Vue from "vue";
import SocketIO from "socket.io-client";

const connection = SocketIO("http://localhost:3000", {
  //   channel: "order",
  withCredentials: false,
  reconnect: true,
});

// connection.on("refreshList", console.log);
// connection.emit("iamAdmin");

window.socket = connection;

Vue.prototype.$socket = connection;
