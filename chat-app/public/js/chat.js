const socket = io();

const messageInput = document.querySelector(".message-input");
const sendBtn = document.querySelector(".btn-send");
const locationShareBtn = document.querySelector(".btn-location");
const messages = document.querySelector("#messages");
const sidebar = document.querySelector("#sidebar");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoScroll = () => {
  const $newMessage = messages.lastElementChild;

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = messages.offsetHeight;

  // Height of messages container
  const containerHeight = messages.scrollHeight;

  // How far have I scrolled?
  const scrollOffset = messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    messages.scrollTop = messages.scrollHeight;
  }
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendBtn.setAttribute("disabled", "disabled");

  // if (messageInput.value === "") {
  //   result.innerHTML = "";
  //   sendBtn.removeAttribute("disabled");
  //   result.insertAdjacentHTML("afterbegin", "Please enter some input.");
  //   return;
  // }

  socket.emit("send", messageInput.value, () => {
    // console.log("The message was delievered.");
    sendBtn.removeAttribute("disabled");
  });

  messageInput.value = "";
  messageInput.focus();
});

socket.on("roomData", ({ room, users }) => {
  sidebar.innerHTML = "";
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });

  sidebar.insertAdjacentHTML("beforeend", html);
});

socket.on("message", ({ username, text, createdAt }) => {
  // console.log(message, count);
  const html = Mustache.render(messageTemplate, {
    username,
    message: text,
    // createdAt: moment(createdAt).fromNow(),
    createdAt: moment(createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

socket.on("recieve", ({ username, text: message, createdAt }) => {
  const html = Mustache.render(messageTemplate, {
    username,
    message,
    createdAt: moment(createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

socket.on("locationMessage", ({ username, link, createdAt }) => {
  const html = Mustache.render(locationTemplate, {
    username,
    link,
    createdAt: moment(createdAt).format("h:mm a"),
  });

  messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

locationShareBtn.addEventListener("click", (e) => {
  e.preventDefault();

  locationShareBtn.setAttribute("disabled", "disabled");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;

      socket.emit(
        "locationMessage",
        {
          lat: coords.latitude,
          long: coords.longitude,
        },
        () => {
          locationShareBtn.removeAttribute("disabled");
          console.log("Location recieved.");
        }
      );
    });
  }
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    console.log(error);
  }
});
