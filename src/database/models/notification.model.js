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
    type: {
        type: String
    }
})

module.exports = mongoose.model("Notifications", NotificationModel)