const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get(['/', '/funciones', '/desarrollos'], (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

app.get('/api/hello', (req, res) => {

    res.json({ message: 'Hello from the backend!' });

});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');

});


