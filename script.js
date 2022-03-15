const socket = io("http://localhost:3002");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

//event to get user name and showing the user name to the client linked to the same server
const name = prompt("what is your name");
appendMessage("you joined");
socket.emit("new-user", name);

//event listening to the chat-messages
socket.on("chat-message", (data) => {
  console.log(data);
  appendMessage(`${data.message} from ${data.name}`);
});

//event listening on user connection
socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

//event listening for user disconnection
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

//event for listening to the errors on socket.io connect_error
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

//addition of the event listener on the chat submit button
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`you: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

//appending chat messages to the message container div
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageContainer.append(messageElement);
}
