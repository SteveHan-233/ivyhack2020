require('./models/User');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
const mongoUri = 'mongodb+srv://admin:passwordpassword@dev.go8ib.mongodb.net/<dbname>?retryWrites=true&w=majority';
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
app.listen('3000', () => {
    console.log('listening on 3000');
});
//# sourceMappingURL=index.js.map