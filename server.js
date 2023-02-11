'use strict';
console.log('SERVER UP!');

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// USE
// implement express .get(), .use(), .post(), delete()
const app = express();

// middleware its like our bouncer....
app.use(cors());
const PORT = process.env.PORT || 5005;



app.get('/', (req, res) => {
  res.status(200).send('Hello from Saturdays!');
});











//star do?
app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR
// eslint-disable-next-line no-unused-vars
app.use((error, request, res, next) => {
  res.status(500).send(error.message);
});

// LISTEN(port, callback)
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
