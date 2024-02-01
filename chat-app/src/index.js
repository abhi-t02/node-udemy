import express from "express";
import http from "http";
import path from "path";
import { URL } from "url";
import { Server } from "socket.io";
import Filter from "bad-words";

import { generateLocationMessage, generateMessage } from "./utils/messages.js";
import { addUser, getUser, getUserInRoom, removeUser } from "./utils/users.js";
import { addRoom, getRooms } from "./utils/room.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const dirname = new URL(".", import.meta.url).pathname;
const publicDir = path.join(dirname, "../public").slice(1);
const filter = new Filter();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

const badWords = ["bad", "word", "chat"];
filter.addWords(...badWords);

io.on("connection", (socket) => {
  io.emit("rooms", { rooms: getRooms() });
  // joining room
  socket.on("join", ({ username, room }, callBack) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      callBack(error);
    }
    addRoom(room);
    socket.join(user.room);

    socket.emit(
      "message",
      generateMessage("Admin", `Welcome, ${user.username}`)
    );

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage(
          "Admin",
          `A new user ${user.username} has joined the room.`
        )
      );

    // send room data
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room),
    });

    callBack();
  });

  // sending messages
  socket.on("send", (message, callBack) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "recieve",
      generateMessage(
        user.username,
        message !== "" ? filter.clean(message) : ""
      )
    );
    callBack();
  });

  socket.on("locationMessage", (coords, callBack) => {
    const user = getUser(socket.id);
    const link = `https://www.google.com/maps?q=${coords.lat},${coords.long}`;
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(user.username, link)
    );
    callBack();
  });

  // User disconnects
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "recieve",
        generateMessage("Admin", `User ${user.username} has left`)
      );
    }
  });
});

server.listen(PORT, () => {
  console.log("server is listening...");
});
