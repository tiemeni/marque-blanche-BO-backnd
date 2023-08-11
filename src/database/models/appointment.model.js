const mongoose = require("mongoose")
const { APPOINTMENT, MOTIF, PATIENT, CENTRE, USER } = require("../../constants/entity")

const appointmentModel = mongoose.Schema({
    practitioner: {
        type: mongoose.Types.ObjectId,
        ref: USER,
        require
    },
    center: {
        type: mongoose.Types.ObjectId,
        ref: CENTRE,
        require
    },
    patient: {
        type: mongoose.Types.ObjectId,
        ref: PATIENT,
        require
    },
    motif: {
        type: mongoose.Types.ObjectId,
        ref: MOTIF,
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
    dayOfWeek: {
        type: Number,
        require
    },
    wasMoved: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Planifié'
    }
})

module.exports = mongoose.model(APPOINTMENT, appointmentModel)
