const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(cors());

let messages = [];

wss.on('connection', (ws) => { // <-- Listen for connections
    ws.on('message', (message) => { // <-- Listen for sendMessage events from clients
        //console.log(message);
        const parsedMessage = JSON.parse(message);
        messages.push(parsedMessage);

        console.log(`Message received from ${parsedMessage.source}: ${parsedMessage.message}`);

        // Broadcast updated message history to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messages[messages.length - 1]));
            }
        });
    });
});

const port = 3001;
server.listen(port, () => console.log(`Server running on port ${port}`));