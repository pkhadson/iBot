import SocketIO from "socket.io-client";
import { SocketStream } from "venom-bot/dist/api/model/enum";

const socket = SocketIO(process.env.apiUrl || "http://127.0.0.1:3000", {
  withCredentials: false,
  reconnection: true,
});

const BOT_ID = "BOT1";

console.log(socket.emit("iamBot", BOT_ID));

socket.on("proposal", console.log);
