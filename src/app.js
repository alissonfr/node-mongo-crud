'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

    //conecta ao banco
mongoose.connect('mongodb+srv://admin:admin@cluster0.iqsce.mongodb.net/?retryWrites=true&w=majority');

    //carrega os models
const Product = require('./models/product')

    //carrega as rotas
const indexRoute = require('./routes/index-routes');
const productRoute = require('./routes/product-route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;