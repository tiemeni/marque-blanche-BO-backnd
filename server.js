const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT || 3500;

const loaders = require('./src/loaders')
const auth = require('./src/middlewares/auth.middleware')

//import all routes
const usersRoutes = require('./src/routes/user.route')
const practitiensRoutes = require('./src/routes/practitioner.route')
const specialitiesRoutes = require('./src/routes/specialty.route')
const rightsRoutes = require('./src/routes/right.route')
const groupsRoutes = require('./src/routes/group.route')

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


// routes
server.use('/users', usersRoutes);
server.use('/practitiens', auth, practitiensRoutes);
server.use('/specialites', auth, specialitiesRoutes);
server.use('/droits', auth, rightsRoutes);
server.use('/groupes', auth, groupsRoutes);

const startServer = async () => {
  await loaders({ expressApp: server })

  server.listen(PORT, () => {
    console.log(`started on Port ${PORT}`)
  });
}

startServer()


module.exports = server;