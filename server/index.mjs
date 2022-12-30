import { createServer } from "http";
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from 'cors';

const app = express();
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
httpServer.listen(3001);

const clients = {};

app.use(cors());

console.log("Server started !");

const addClient = socket => {
    console.log("New client connected", socket.id);
    clients[socket.id] = socket;
  };

const removeClient = socket => {
  console.log("Client disconnected", socket.id);
  delete clients[socket.id];
};

io.on("connection", socket => {
    let id = socket.id;
  
    addClient(socket);
  
    socket.on("chat.sent", (data) => {
      console.log(data);
      io.emit("chat.response", data);
    });

    socket.on("disconnect", () => {
      removeClient(socket);
      socket.broadcast.emit("clientdisconnect", id);
    });
});