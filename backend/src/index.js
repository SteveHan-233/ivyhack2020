require("./models/User");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const requireAuth = require("./middlewares/requireAuth");
const bodyParser = require("body-parser");
const { measureMemory } = require("vm");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

app.use(bodyParser.json());
app.use(authRoutes);

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
let polls = [];
io.on("connection", (socket) => {
  console.log("a user connected :D");
  io.emit("init", { messages, polls });
  // use groupid as socket?
  socket.on("message", (msg) => {
    console.log(msg);
    messages.push(msg);
    console.log(messages);
    io.emit("message", msg);
  });
  socket.on("poll", (poll) => {
    polls.push(poll);
    console.log(polls);
    io.emit("poll", poll);
  });
  socket.on("vote", (vote) => {
    console.log(`vote received: ${JSON.stringify(vote)}`);
    polls = polls.map((poll) => {
      if (poll.pollId === vote.pollId) {
        const res = {
          ...poll,
          totalVotes: !poll.totalVotes
            ? vote.numVotes
            : poll.totalVotes + vote.numVotes,
          votes: { ...poll.votes },
          voters: [...poll.voters, vote.username],
        };
        res.votes[vote.vote] = !res.votes[vote.vote]
          ? vote.numVotes
          : res.votes[vote.vote] + vote.numVotes;
        console.log(res);
        return res;
      } else return poll;
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected :(");
  });
});

server.listen(3000, () => console.log("server running on port:" + 3000));
