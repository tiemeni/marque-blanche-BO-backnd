const mongoose = require('mongoose')
const types = require('../../constants/entity')

const NotificationModel = mongoose.Schema({
    title: {
        type: String,
        require
    },
    content: {
        type: String,
        require
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: types.PATIENT
    },
    appointment: {
        type: mongoose.Types.ObjectId,
        ref: types.RDV
    },
    triggeredBy: {
        type: String,
        default: "Rendez-vous"
    },
    color: {
        type: String,
        default: "#04B7C9"
    },
    background: {
        type: String,
        default: 'rgba(4, 183, 201, 0.2)'
    },
    type: {
        type: String
    },
    unreaded: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Notifications", NotificationModel)
