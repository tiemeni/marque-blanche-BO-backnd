// require('dotenv').config();
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require('./config/dataBaseConfig');
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

// connect to the database
connectDB();

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(process.env.PORT || 6000, () => {
    console.log('started!')
  });

})


