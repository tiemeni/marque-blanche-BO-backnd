const mongoose = require("mongoose")
const { APPOINTMENT, MOTIF, PATIENT, CENTRE, USER, LIEU } = require("../../constants/entity")

const appointmentModel = mongoose.Schema({
    practitioner: {
        type: mongoose.Types.ObjectId,
        ref: USER,
        require
    },
    lieu: { type: mongoose.Types.ObjectId, ref: LIEU , require },
    center: {
        type: mongoose.Types.ObjectId,
        ref: CENTRE,
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
    date_long: {
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
    },
    sent: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    backgroundColor: {
        type: String,
        default: '#3788d8'
    },
    borderColor: {
        type: String,
        default: '#3788d8'
    }
})

module.exports = mongoose.model(APPOINTMENT, appointmentModel)
