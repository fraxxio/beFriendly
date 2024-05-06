import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { getRandomQuestions } from './questions.js';
import { fileURLToPath } from 'url';
import {
  buildMsg,
  activateUser,
  updateUserRoom,
  userLeavesApp,
  getUser,
  pairAndJoinUsers,
  getRandomUsers,
  ADMIN,
} from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

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
  console.log(`User ${socket.id} connected`);
  activeUserCount++;

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
      if (user?.room !== 'Unknown') {
        clearInterval(intervalId);
        callback('success');
        // Wait for component to render
        setTimeout(() => {
          io.to(user?.room).emit('questions', getRandomQuestions(user?.room));
        }, 1000);
        //socket.emit('message', buildMsg(ADMIN, 'You can chat now, say hi!'));
      }
    }, 5000);
  });

  // When user disconnects to other user
  socket.on('disconnect', () => {
    const user = getUser(socket.id);
    userLeavesApp(socket.id);

    if (user) {
      io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the room`));
    }
    activeUserCount--;
    io.emit('activeUsers', { users: activeUserCount });
    console.log(`User ${socket.id} disconnected`);
  });

  // Listening for a message event
  socket.on('message', ({ name, text }) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit('message', buildMsg(name, text));
    }
  });

  // Listening for answer progress
  socket.on('answerProgress', (questions) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      io.to(room).emit('answerProgress', questions);
    }
  });

  // Listen for activity
  socket.on('activity', (name) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      socket.broadcast.to(room).emit('activity', name);
    }
  });

  // Active user count
  io.emit('activeUsers', { users: activeUserCount });
});
