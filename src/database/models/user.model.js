const mongoose = require('mongoose');
const { USER, CENTRE, SPECIALITY, GROUP, CIVILITY } = require('../../constants/entity');

const utilisateurModel = mongoose.Schema({
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
        type: Date,
    },
    telephone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
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
    groups: {
        type: mongoose.Schema.Types.ObjectId,
        ref: GROUP,
        required: true
    },
    affectation: {
        type: [String]
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: SPECIALITY,
        required: true
    },
    fonction: {
        type: String
    },
    practitionerFilter: {
        type: String
    },
    motifFilter: {
        type: String
    },
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CENTRE,
        required: true
    },
    isPraticien: {
        type: Boolean,
        default: false
    },
    timeSlot: {
        type: Number
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String
    }
});
module.exports = mongoose.model(USER, utilisateurModel);
