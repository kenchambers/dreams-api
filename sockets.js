const uuid = require('uuid');
const actionTypes = require('./config');
const store = require('./store');
const MessagesController = require('./socket-controllers/messages');
const messagesController = new MessagesController();
const UsersController = require('./socket-controllers/users');
const usersController = new UsersController();
const tokenAuth = require('./token-auth');

addListenersToSocket = ({ io, socket }) => {
  const user = socket.request.user;
  const disconnectedUsers = {};

  if (user.logged_in) {
    // if user logged in is false
    socket.emit('success', {
      message: 'success logged in!',
      user: socket.request.user
    });
  } else {
    // if user logged in is true
    socket.emit('failure', {
      message: 'guest user logged in!',
      user: socket.request.user
    });
  }

  socket.on('messageAdded', data =>
    messagesController.onMessageAdded({ io, socket, data })
  );
  socket.on('newUserAdded', data =>
    usersController.onUserAdded({ io, socket, data })
  );
  socket.on('disconnect', data =>
    usersController.onDisconnect({ io, socket, data })
  );

  socket.on('subscribeToTimer', interval => {
    let event = subscribeToTimer;
    console.log('client is subscribing to timer with interval ', interval);
    return socket.broadcast.emit(event, { userId: socket.id });
    setInterval(() => {
      io.emit('timer', new Date());
    }, interval);
  });
};

module.exports.init = io => {
  //run token auth
  console.log(tokenAuth(io));
  // console.log('------------------------');

  io.on('connection', socket => addListenersToSocket({ io, socket }));
  const port = 8000;
  io.listen(port);
  console.log('sockets established on ports ', port);
};
