const mongoose = require("mongoose")

const appointmentModel = mongoose.Schema({
    practitioner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require
    },
    center: {
        type: mongoose.Types.ObjectId,
        ref: 'Centre',
        require
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: 'FichePatient',
        require
    },
    motif: {
        type: mongoose.Types.ObjectId,
        ref: 'Motif',
        require
    },
    startTime: {
        type: String,
        require
    },
    endTime: {
        type: String,
        require
    },
    provenance: {
        type: String,
        require
    },
    duration: {
        type: Number,
        require
    },
    date: {
        type: Date,
        require
    },
    wasMoved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Appointment', appointmentModel)