const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
    // Cuando el servidor recibe un mensaje de un cliente
    ws.on('message', (message) => {
        // Retransmite el mensaje a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Servidor WebSocket escuchando en el puerto 3000');
});