const express = require('express');

const app = express();

app.get('/users', (req, res) => {
  res.send({firstName: 'John', lastName: 'Doe'});
});

app.post('/users', (req, res) => {
  res.send('Data Successfully saved to the database');
});

app.delete('/users', (req, res) => {
  res.send('Data Successfully deleted from the database');
});

app.put('/users', (req, res) => {
  res.send('Data Successfully updated in the database');
});

app.patch('/users', (req, res) => {
  res.send('Data Successfully updated in the database via patch');
});

app.use('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
