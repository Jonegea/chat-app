
// Importar los módulos necesarios
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Crear una instancia de la aplicación Express
const app = express();
// Crear un servidor HTTP utilizando la aplicación Express
const server = http.createServer(app);
// Crear un servidor WebSocket pasando el servidor HTTP como argumento
const wss = new WebSocket.Server({ server });

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Lógica cuando un cliente se conecta al servidor a través de WebSocket
wss.on('connection', (ws) => {
    // Cuando el servidor recibe un mensaje de un cliente
    ws.on('message', (message) => {
        console.log("Mensaje :", message);
        // Retransmitir el mensaje a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

// Iniciar el servidor en el puerto 3000 y mostrar un mensaje en la consola cuando está escuchando
server.listen(3000, () => {
    console.log('Servidor WebSocket escuchando en el puerto 3000');
});