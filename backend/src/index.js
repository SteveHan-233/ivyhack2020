const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const mongoUri =
  'mongodb+srv://admin:passwordpassword@dev.go8ib.mongodb.net/dev?retryWrites=true&w=majority';

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

app.listen('3000', () => {
  console.log('listening on 3000');
});

// const server = require('http').createServer(app);
// const io = require('socket.io').listen(server);
// const port = 3000;

// io.on('connection', (socket) => {
//   console.log('a user connected :D');
//   socket.on('chat message', (msg) => {
//     console.log(msg);
//     io.emit('chat message', msg);
//   });
// });

// server.listen(port, () => console.log('server running on port:' + port));
