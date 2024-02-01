const socket = io();

const roomsEl = document.querySelector("#rooms");

socket.on("rooms", ({ rooms = [] }) => {
  //   if (rooms.length === 0) {
  //     return;
  //   }
  console.log(rooms);
  let html = "";
  rooms.forEach((room) => (html += `<option value=${room} />`));

  roomsEl.insertAdjacentHTML("afterbegin", html);
});
