const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { measureMemory } = require("vm");

const app = express();
app.use(bodyParser.json());
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 4000;

const mongoUri =
  "mongodb+srv://timothytqin:ivyhacks2020@votetrader.cujmq.mongodb.net/VoteTrader?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("mongo connected");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const messages = [];
io.on("connection", (socket) => {
  console.log("a user connected :D");
  // use groupid as socket?
  socket.on("message", (msg) => {
    console.log(msg);
    messages.push(msg);
    console.log(messages);
    io.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected :(");
  });
});

server.listen(port, () => console.log("server running on port:" + port));
