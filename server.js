const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());

let messages = [];

app.post('/sendMessage', (req, res) => {
    const message = req.body;
    messages.push(message);
    const source = req.body.source;
    console.log(`Message received from ${message.source}:`, message.message);
    res.json({status: 'Message received', message: message.message});
});

app.get('/messageHistory', (req, res) => {
    res.json(messages);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

