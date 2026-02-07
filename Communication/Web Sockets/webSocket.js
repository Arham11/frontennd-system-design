import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app); // node: HTTP server
const io = new Server(server); // Notice that I initialize a new instance of socket.io by passing the server (the HTTP server) object.
const PORT = 5111;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Then I listen on the connection event for incoming sockets and log it to the console.
io.on("connection", (socket) => {
  console.log("a user connected");

  // listening "chat message" event
  socket.on("chat message", (msg) => {
    console.log("received message", msg);
    io.emit("chat message", msg); // emiting/sending the msessage to whoever is listening to this
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log("server running at http://localhost:3000");
});
