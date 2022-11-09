const app = require("./app");
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const http = new HttpServer(app);
const io = new IoServer(http);

let messages = [];

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("update-messages", messages);
  socket.on("new-message", (message) => {
    messages.push(message);
    io.emit("messages", messages);
    io.sockets.emit("new-messages-from-server", message);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
