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
const professionRoutes = require('./src/routes/profession.routes')
const motifRoutes = require('./src/routes/motif.route')
const lieuRoutes = require('./src/routes/lieu.route')
const extLieuRoutes = require('./src/routes/extLieu.route')
const structureRoute = require("./src/routes/centre.routes")
const practitiensRoutes = require('./src/routes/practitioner.route')
const extPractitiensRoutes = require('./src/routes/extPraticiens.route')
const patientRoutes = require('./src/routes/patient.route')
const specialitiesRoutes = require('./src/routes/specialty.route')
const extSpecialitiesRoutes = require('./src/routes/extSpeciality.route')
const rightsRoutes = require('./src/routes/right.route')
const groupsRoutes = require('./src/routes/group.route')
const civilitiesRoutes = require('./src/routes/civility.route')
const appointmentRoutes = require('./src/routes/appointment.route')
const extUserToutes = require('./src/routes/extUser.route')

const connectDB = require("./src/loaders/mongoose");
const { startServer } = require('./src/helpers');
const { verifyToken } = require("./src/routes/verifyToken");

require("dotenv").config();

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
server.use('/ext_users', extUserToutes);
server.use('/motif', motifRoutes);
server.use('/practitiens', checkCentre, practitiensRoutes);
server.use('/ext_practitiens', extPractitiensRoutes);
server.use('/ext_specialites', extSpecialitiesRoutes);
server.use('/specialites', checkCentre, specialitiesRoutes);
server.use('/patients', checkCentre, patientRoutes);
server.use('/structure', structureRoute);
server.use('/lieu', checkCentre, lieuRoutes);
server.use('/ext_lieu', extLieuRoutes);
server.use('/droits', rightsRoutes);
server.use('/groupes', checkCentre, groupsRoutes);
server.use('/civilites', civilitiesRoutes);
server.use('/profession', professionRoutes);
server.use('/appointments', checkCentre, appointmentRoutes);
server.post('/verifyToken', verifyToken);
server.get('/checkVersion', (req, res) => {
  res.send("version backoffice gatewayDoc 24-07 midi")
});

startServer({ connectDB, server, startServer, PORT });

module.exports = server;
