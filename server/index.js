import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { getRandomQuestions } from './questions.js';
import { fileURLToPath } from 'url';
import {
  buildMsg,
  activateUser,
  userLeavesApp,
  getUser,
  pairAndJoinUsers,
  ADMIN,
  getFriendName,
} from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

let activeUserCount = 0;
let lookingForFriendUsers = [];

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? false
        : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  },
});

io.on('connection', (socket) => {
  activeUserCount++;
  console.log(`User ${socket.id} connected. Users: ${activeUserCount}`);

  socket.on('looking', (name, callback) => {
    if (!name || name === 'Admin') {
      callback('fail');
    }
    activateUser(socket.id, name, 'Unknown');
    // leave previous room
    const prevRoom = getUser(socket.id)?.room;

    if (prevRoom) {
      socket.leave(prevRoom);
      io.to(prevRoom).emit('message', buildMsg(ADMIN, `${name} has left the room`));
    }

    lookingForFriendUsers.push(socket.id);
    pairAndJoinUsers(lookingForFriendUsers, io);

    const intervalId = setInterval(() => {
      const user = getUser(socket.id);
      if (user?.room !== 'Unknown' && user) {
        clearInterval(intervalId);
        callback({ result: 'success', friendName: getFriendName(user?.name, user?.room) });
        // Wait for component to render
        setTimeout(() => {
          io.to(user?.room).emit('questions', getRandomQuestions(user?.room));
        }, 1000);
      }
    }, 5000);
  });

  // When user disconnects to other user
  socket.on('disconnect', () => {
    const user = getUser(socket.id);
    userLeavesApp(socket.id, lookingForFriendUsers);

    if (user) {
      io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the room`));
    }
    activeUserCount--;
    io.emit('activeUsers', { users: activeUserCount });
    io.to(user?.room).emit('disconnected');
    console.log(`User ${socket.id} disconnected. Users: ${activeUserCount}`);
  });

  // Listening for a message event
  socket.on('message', ({ name, text, replyingTo }) => {
    const user = getUser(socket.id);
    if (user.room) {
      io.to(user.room).emit('message', buildMsg(name, text, user.id, replyingTo));
    }
  });

  // Listening for answer progress
  socket.on('answerProgress', (questions) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      socket.broadcast.to(room).emit('answerProgress', questions);
    }
  });

  // Listen for chat activity
  socket.on('activity', ({ name, key }) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      socket.broadcast.to(room).emit('activity', { name: name, key: key });
    }
  });

  //Listen to adding reaction to message
  socket.on('addReaction', ({ id, emoji }) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit('addReaction', { id, emoji });
    }
  });

  //Listen to user getting ready to chat
  socket.on('isReadyToChat', () => {
    const room = getUser(socket.id)?.room;
    if (room) {
      socket.broadcast.to(room).emit('isReadyToChat');
    }
  });

  // Active user count
  io.emit('activeUsers', { users: activeUserCount });
});
