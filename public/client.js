// Código del lado del cliente
const socket = new WebSocket('ws://localhost:3000');

// Obtener elementos del DOM
const chatWindow = document.getElementById('chat');
const messageForm = document.getElementById('form');
const messageInput = document.getElementById('message');

// Agregar un listener al formulario para manejar el envío de mensajes
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Obtener el mensaje del campo de entrada
    const message = messageInput.value;
    // Verificar si el mensaje no está vacío antes de enviarlo
    if (message.trim() !== '') {
        // Enviar el mensaje al servidor a través del socket WebSocket
        socket.send(message);
        // Mostrar el mensaje enviado por el propio cliente en la ventana del chat
        displayMessage(`Tú: ${message}`);
        // Limpiar el campo de entrada
        messageInput.value = '';
    }
});

// Agregar un listener para manejar los mensajes entrantes desde el servidor
socket.addEventListener('message', (event) => {
    // Obtener el mensaje del evento y mostrarlo en la ventana del chat
    const message = event.data;
    displayMessage(message);
});

// Función para mostrar mensajes en la ventana del chat
function displayMessage(message) {
    // Crear un nuevo elemento <div> para el mensaje
    const messageElement = document.createElement('div');
    // Establecer el texto del elemento como el mensaje recibido
    messageElement.textContent = message;
    // Añadir el elemento al chatWindow
    chatWindow.appendChild(messageElement);
    // Asegurar que el chat se desplace hacia abajo para mostrar el mensaje más reciente
    chatWindow.scrollTop = chatWindow.scrollHeight;
}