'use strict';
console.log('SERVER UP!');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5005;

const mongoose = require('mongoose');
const Cat = require('./models/cats.js');
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.get('/', (req, res) => {
  res.status(200).send('Hello from Server!');
});

app.get('/cats', getCats);
app.post('/cats', postCats);
app.delete('/cats/:id', deleteCats);


async function getCats(request, response, next){
  try {
    let catResults = await Cat.find();
    response.status(200).send(catResults);
  } catch (error) {
    next(error);
  }
}


async function postCats(request, response, next){
  console.log('coming in on: ',request.body);
  try {
    let createCat = await Cat.create(request.body);
    response.status(200).send(createCat);
  } catch (error) {
    next(error);
  }
}

async function deleteCats(request, response, next){
  console.log('id', request.params.id);
  try {
    let id = request.params.id;
    await Cat.findByIdAndDelete(id);
    response.status(200).send('Cat was ...');
  } catch (error) {
    next(error);
  }
}











app.get('*', (request, response) => {
  response.status(404).send('Not available');
});


// eslint-disable-next-line no-unused-vars
app.use((error, request, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
