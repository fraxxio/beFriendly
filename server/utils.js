export const ADMIN = 'Admin';

const UsersState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

export function buildMsg(name, text, id) {
  return {
    name,
    text,
    id,
    time: new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date()),
  };
}

// User functions
export function activateUser(id, name, room) {
  const user = { id, name, room };
  UsersState.setUsers([...UsersState.users.filter((user) => user.id !== id), user]);
}

export function updateUserRoom(id, newRoom) {
  let newUser;
  const updatedUsers = UsersState.users.map((user) => {
    if (user.id === id) {
      newUser = { ...user, room: newRoom };
      return newUser;
    }
    return user;
  });
  UsersState.setUsers(updatedUsers);
}

export function userLeavesApp(id, lookingForFriendUsers) {
  UsersState.setUsers(UsersState.users.filter((user) => user.id !== id));

  const filteredUsers = lookingForFriendUsers.filter((user) => user !== id);
  lookingForFriendUsers.length = 0;
  lookingForFriendUsers.push(...filteredUsers);
}

export function getUser(id) {
  return UsersState.users.find((user) => user.id === id);
}

export function pairAndJoinUsers(lookingForFriendUsers, io) {
  console.log('Matchmaking count: ', lookingForFriendUsers.length);
  if (lookingForFriendUsers.length < 2) {
    return;
  }

  const [user1Id, user2Id] = getRandomUsers(lookingForFriendUsers);

  // filter out the users to remove
  const usersToRemove = [user1Id, user2Id];
  const filteredUsers = lookingForFriendUsers.filter((user) => !usersToRemove.includes(user));

  lookingForFriendUsers.length = 0;
  lookingForFriendUsers.push(...filteredUsers);

  const roomName = `Room_${user1Id}_${user2Id}`;

  io.in(user1Id).socketsJoin(roomName);
  io.in(user2Id).socketsJoin(roomName);

  updateUserRoom(user1Id, roomName);
  updateUserRoom(user2Id, roomName);
  return;
}

export function getRandomUsers(userArray) {
  const shuffledArray = userArray.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, 2);
}

export function getFriendName(userName, roomName) {
  const usersInRoom = UsersState.users.filter((user) => user.room === roomName);
  return usersInRoom[0].name === userName ? usersInRoom[1].name : usersInRoom[0].name;
}
