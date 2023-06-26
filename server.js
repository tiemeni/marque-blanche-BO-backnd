const dns = require('dns')
// const chalk = require('chalk')
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
const specialitiesRoutes = require('./src/routes/specialty.route');
const patientRoutes = require('./src/routes/patients/patient.route');
const connectDB = require("./src/loaders/mongoose");


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
server.use('/patients', patientRoutes);

// server.use('/users/addrole', require('./src/routes/droits/addRole'));
// server.use('/users/getAllRoles', require('./src/routes/droits/getAllRoles'));

const startServer = async () => {
  console.clear();
  //---this is just for developpment purpose
  return dns.resolve("www.google.com", (err) => {
    if (err) {
      console.log('you are not connected');
      return null;
    } else {
      console.log("setting up the server ...")
      connectDB()
        .then(() => {
          server.listen(PORT, () => {
            console.clear()
            console.log(`started on Port ${PORT} !`)
          });
        })
        .catch(e => {
          console.log('storage service error : ' + e);
          startServer()
        })
    }
  })
}

startServer()


module.exports = server;