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

let players = {};
let unmatched;

function joinGame(socket) {
  players[socket.id] = {
    opponent : unmatched,
    symbol: "X",
    socket: socket
  };

  if (unmatched) {
    players[socket.id].symbol = "O";
    players[unmatched].opponent = socket.id;
    unmatched = null;
  } else {
    unmatched = socket.id;
  }
}

function getOpponent(socket) {
  if (!players[socket.id].opponent) {
    return;
  }

  return players[players[socket.id].opponent].socket;
}

io.on("connection", function(socket) {
  joinGame(socket);

  // Once the socket has an opponent, we can begin the game
  if (getOpponent(socket)) {
    socket.emit("game.begin", {
      symbol: players[socket.id].symbol
    });

    getOpponent(socket).emit("game.begin", {
      symbol: players[getOpponent(socket).id].symbol
    });
  }

  // Listens for a move to be made and emits an event to both
  // players after the move is completed
  socket.on("make.move", function(data) {
    if (!getOpponent(socket)) {
      return;
    }

    socket.emit("move.made", data);
    getOpponent(socket).emit("move.made", data);
  });

  // Emit an event to the opponent when the player leaves
  socket.on("disconnect", function() {
    if (getOpponent(socket)) {
      getOpponent(socket).emit("opponent.left");
    }
  });
});