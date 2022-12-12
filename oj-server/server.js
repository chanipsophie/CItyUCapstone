const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// username and password is replaced with some fake stuff for security purpose
mongoose.connect('mongodb+srv://hahabenguser:hahabengpassword@cluster0.rcffnun.mongodb.net/ojservice?retryWrites=true&w=majority');

const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

app.use(express.static(path.join(__dirname, '../public/')));
app.use('/', indexRouter);
app.use('/api/v1', restRouter);
app.use(function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../public')});
});


const http = require('http');
const socketIO = require('socket.io');
const io = socketIO();
const editorSocketService = require('./services/editorSocketService')(io);
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  throw error;
}

function onListening() {
  const addr = server.address();
  console.log('listening on ' + addr.port);
}