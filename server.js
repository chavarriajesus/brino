const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get(['/', '/funciones', '/desarrollos'], (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'marketing', 'index.html'))
);

app.get(/^\/app(?:\/.*)?$/, (req, res, next) => {
  const rootDir = path.join(__dirname, "public", "app");
  res.sendFile("index.html", { root: rootDir }, (err) => {
    if (err) {
      console.error("sendFile(/app/index.html) failed:", err);
      next(err);
    }
  });
});


app.get('/api/hello', (req, res) => {

    res.json({ message: 'Hello from the backend!' });

});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');

});


