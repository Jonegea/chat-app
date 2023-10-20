const socket = new WebSocket('ws://localhost:3000');

const chatWindow = document.getElementById('chat');
const messageForm = document.getElementById('form');
const messageInput = document.getElementById('message');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.send(message);
        displayMessage(`Tú: ${message}`); // Mostrar el mensaje enviado por el propio cliente
        messageInput.value = '';
    }
});

socket.addEventListener('message', (event) => {
    const message = event.data;
    displayMessage(message);
});

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}