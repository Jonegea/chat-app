const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Array para almacenar todas las conexiones WebSocket
const clients = [];

wss.on('connection', (ws) => {
    // Agregar el nuevo cliente a la lista de clientes
    clients.push(ws);

    // Manejar los mensajes recibidos de los clientes
    ws.on('message', (message) => {
        console.log('Mensaje cifrado recibido del cliente:', message);
        // Reenviar el mensaje cifrado a todos los clientes conectados
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Manejar el cierre de la conexión del cliente
    ws.on('close', () => {
        // Eliminar el cliente de la lista de clientes
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });
});

server.listen(3000, () => {
    console.log('Servidor WebSocket escuchando en el puerto 3000');
});
