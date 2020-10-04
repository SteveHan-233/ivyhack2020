require('./models/User');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 4000;

const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  'mongodb+srv://timothytqin:ivyhacks2020@votetrader.cujmq.mongodb.net/VoteTrader?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('mongo connected');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

io.on('connection', (socket) => {
  console.log('a user connected :D');
  socket.on('chat message', (msg) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
});

server.listen(port, () => console.log('server running on port:' + port));
