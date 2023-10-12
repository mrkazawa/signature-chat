'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = 8080;

const app = express();
app.use(bodyParser.json());
const httpServer = createServer(app);
const io = new Server(httpServer);

//--------------- Socket Start ---------------//

io.on("connection", (socket) => {
  console.log(`user ${socket.id} is connected`);

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} is disconnected`);
  });

  socket.on("broadcast", (data) => {
    socket.broadcast.emit("broadcast", data);
  });
});

//--------------- Socket End ---------------//
//--------------- REST API Start ---------------//

app.get("/download", (req, res) => {
  const data = {
    publicKey: "server-public-key",
    algorithm: "ecdsa",
    hash: "hash-of-server-public-key"
  };
  res.send(JSON.stringify(data));
});

app.post("/register", function (req, res) {
  console.log(`received user registration from (${req.body.username}, ${req.body.publicKey})`);
  res.send("successfully registered");
});

//--------------- REST API End ---------------//

httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
