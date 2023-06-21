const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT || 3500;

const loaders = require('./src/loaders')

//import all routes
const usersRoutes = require('./src/routes/usersRoutes')
const practitiensRoutes = require('./src/routes/practitiensRoutes')
const specialitiesRoutes = require('./src/routes/specialitiesRoutes')


require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


// routes
server.use('/users', usersRoutes);
server.use('/practitiens', practitiensRoutes);
server.use('/specialites', specialitiesRoutes);

// server.use('/users/addrole', require('./src/routes/droits/addRole'));
// server.use('/users/getAllRoles', require('./src/routes/droits/getAllRoles'));

const startServer = async () => {
  await loaders({ expressApp: server })

  server.listen(PORT, () => {
    console.log(`started on Port ${PORT}`)
  });
}

startServer()


module.exports = server;