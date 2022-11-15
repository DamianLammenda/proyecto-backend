const socket = io();
let date = new Date();
let messages = [];

function sendNewMessage() {
  const message = document.getElementById("message").value;
  const username = document.getElementById("mail").value;
  if (username == "" || message == "") {
    alert("Por favor ingrese su correo");
  }

  const messageObject = {
    username,
    message,
  };
  socket.emit("new-message", messageObject);
  document.getElementById("message").value = "";
}

function updateMessageList(data) {
  let messagetoHtml = "";
  data.forEach((i) => {
    messagetoHtml += `<li class="username"> ${
      i.username
    }: <span class="date">[${date.toLocaleString()}]</span><li class="message">${
      i.message
    }</li></li>`;
  });
  document.getElementById("messageList").innerHTML = messagetoHtml;
}

socket.on("update-messages", (data) => {
  messages = data;
  updateMessageList(data);
});

socket.on("new-messages-from-server", (data) => {
  messages.push(data);
  updateMessageList(messages);
});
