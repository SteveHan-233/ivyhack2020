require('./models/User');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

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

app.get('/', requireAuth, (req, res) => {
  res.send(req.user.email);
});

io.on('connection', (socket) => {
  console.log('a user connected :D');
  socket.on('chat message', (msg) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => console.log('server running on port:' + 3000));
