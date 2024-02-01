const rooms = [];

const addRoom = (room) => {
  if (!rooms.includes(room)) {
    rooms.push(room);
  }
};

const getRooms = () => {
  return rooms;
};

export { addRoom, getRooms };
