const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require('./config/DBconfig/dataBaseConfig');
const PORT = process.env.PORT || 3500;
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

// connect to the database
connectDB()
  .then(_s => null)
  .catch(e => console.log(e))

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// routes
server.use('/users/register', require('./routes/userRoutes/register'));
server.use('/users/getUsers', require('./routes/userRoutes/getAllUsers'));
server.use('/users/addrole', require('./routes/userRoutes/addRole'));
server.use('/users/getUserRoles', require('./routes/userRoutes/getUserRoles'));
server.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`started on Port ${PORT}`)
  });

})


