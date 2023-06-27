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
const motifRoutes = require('./src/routes/Motifs/motif.route')
const lieuRoutes = require('./src/routes/Lieux/lieu.route')
const structureRoute = require("./src/routes/centres/centre.routes")
const practitiensRoutes = require('./src/routes/practitioner.route')
const patientRoutes = require('./src/routes/patients/patient.route');
const connectDB = require("./src/loaders/mongoose");

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
server.use('/motif', auth, motifRoutes);
server.use('/practitiens', auth, practitiensRoutes);
server.use('/specialites', auth, specialitiesRoutes);
server.use('/patients', patientRoutes);
server.use('/structure', structureRoute);
server.use('/lieu', lieuRoutes);

// server.use('/users/addrole', require('./src/routes/droits/addRole'));
// server.use('/users/getAllRoles', require('./src/routes/droits/getAllRoles'));
server.use('/droits', auth, rightsRoutes);
server.use('/groupes', auth, groupsRoutes);

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