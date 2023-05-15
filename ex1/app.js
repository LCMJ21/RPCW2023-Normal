var express = require('express');
var path = require('path');
var logger = require('morgan');

// MongoDB
const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/scienceJobs';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', () => {
    console.log('Conexão ao MongoDB realizada com sucesso...');
});

var contractsRouter = require('./routes/contracts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/contracts', contractsRouter);

module.exports = app;
