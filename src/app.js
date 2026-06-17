const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test', (req, res) => {
    res.send('This is the test page.');
});

app.get('/hello', (req, res) => {
    res.send('This is the hello page.');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
