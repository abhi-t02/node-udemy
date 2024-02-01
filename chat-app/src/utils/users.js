const users = [];

const addUser = ({ id, username, room }) => {
  // clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return {
      error: "Username and room required.",
    };
  }

  // check for exsiting user
  const existingUser = users.find(
    (userObj) => userObj.username === username && userObj.room === room
  );

  if (existingUser) {
    return {
      error: "Username is in use.",
    };
  }

  // Store user
  const user = {
    id,
    username,
    room,
  };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return undefined;
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUserInRoom = (room) => {
  const roomUsers = users.filter((user) => user.room === room);

  return roomUsers;
};

export { addUser, getUser, getUserInRoom, removeUser };
