const mongoose = require('mongoose');
const { PATIENT, CENTRE, RIGHT, CIVILITY } = require('../../constants/entity');

const fichePatientModel = mongoose.Schema({
    civility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CIVILITY,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
    },
    telephone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    initiales: {
        type: String
    },
    photo: {
        contentType: String,
        data: Buffer
    },
    active: {
        type: Boolean,
        required: true
    },
    rights: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require,
            ref: RIGHT
        }
    ],
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CENTRE,
        required: true
    }
});
module.exports = mongoose.model(PATIENT, fichePatientModel);