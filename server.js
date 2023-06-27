const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT || 3500;

const auth = require('./src/middlewares/auth.middleware')

//import all routes
const usersRoutes = require('./src/routes/user.route')
const motifRoutes = require('./src/routes/Motifs/motif.route')
const lieuRoutes = require('./src/routes/Lieux/lieu.route')
const structureRoute = require("./src/routes/centres/centre.routes")
const practitiensRoutes = require('./src/routes/practitioner.route')
const patientRoutes = require('./src/routes/patients/patient.route')
const specialitiesRoutes = require('./src/routes/specialty.route')
const rightsRoutes = require('./src/routes/right.route')
const groupsRoutes = require('./src/routes/group.route')

const connectDB = require("./src/loaders/mongoose");
const { startServer } = require('./src/helpers');
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
server.use('/droits', auth, rightsRoutes);
server.use('/groupes', auth, groupsRoutes);

startServer({connectDB, server, startServer, PORT});

module.exports = server;