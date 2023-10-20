// Crear una nueva conexión WebSocket con el servidor en el puerto 3000
const socket = new WebSocket('ws://localhost:3000');

// Obtener elementos del DOM
const chatWindow = document.getElementById('chat');
const messageForm = document.getElementById('form');
const messageInput = document.getElementById('message');

// Agregar un listener al formulario para manejar el envío de mensajes
messageForm.addEventListener('submit', (event) => {
    // Evitar el comportamiento predeterminado del formulario
    event.preventDefault();
    // Obtener el mensaje del campo de entrada
    const message = messageInput.value;
    // Enviar el mensaje al servidor a través del socket WebSocket
    if (message.trim() !== '') {
        socket.send(message);
        // Limpiar el campo de entrada
        messageInput.value = '';
    }
});

// Agregar un listener para manejar los mensajes entrantes desde el servidor
socket.addEventListener('message', (event) => {
    // Obtener el mensaje del evento
    const message = event.data;
    // Mostrar el mensaje en la ventana del chat llamando a la función displayMessage
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
