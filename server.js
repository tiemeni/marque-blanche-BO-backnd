const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require('cors')

const auth = require('./src/middlewares/auth.middleware')
const checkCentre = require('./src/middlewares/center.middleware')

//import all routes
const usersRoutes = require('./src/routes/user.route')
const motifRoutes = require('./src/routes/motif.route')
const lieuRoutes = require('./src/routes/lieu.route')
const structureRoute = require("./src/routes/centre.routes")
const practitiensRoutes = require('./src/routes/practitioner.route')
const patientRoutes = require('./src/routes/patient.route')
const specialitiesRoutes = require('./src/routes/specialty.route')
const rightsRoutes = require('./src/routes/right.route')
const groupsRoutes = require('./src/routes/group.route')
const civilitiesRoutes = require('./src/routes/civility.route')
const appointmentRoutes = require('./src/routes/appointment.route')

const connectDB = require("./src/loaders/mongoose");
const { startServer } = require('./src/helpers');
const { verifyToken } = require("./src/routes/verifyToken");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

server.use(cors({
  origin: "*",
  methods: "*",
  preflightContinue: true,
  allowedHeaders: true,
  credentials: true
}))
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// routes
server.use('/users', checkCentre, usersRoutes);
server.use('/motif', motifRoutes);
server.use('/practitiens', checkCentre, practitiensRoutes);
server.use('/specialites', checkCentre, specialitiesRoutes);
server.use('/patients', checkCentre, patientRoutes);
server.use('/structure', structureRoute);
server.use('/lieu', checkCentre, lieuRoutes);
server.use('/droits', rightsRoutes);
server.use('/groupes', checkCentre, groupsRoutes);
server.use('/civilites', civilitiesRoutes);
server.use('/appointments', checkCentre, appointmentRoutes);

server.post('/verifyToken', verifyToken);
server.get('/checkVersion', (req, res) => {
  res.send("version backoffice gatewayDoc 24-07 midi")
});

startServer({ connectDB, server, startServer, PORT });

module.exports = server;
