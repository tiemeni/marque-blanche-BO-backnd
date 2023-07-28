const mongoose = require('mongoose');
const { CENTRE, PROFESSION, SPECIALITY } = require('../../constants/entity');
const { ID_PROFESSION_SPECIALISTE } = require('../../constants/id.profession');

const specialtyModel = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    reference: {
        type: String
    },
    webAlert: {
        type: String
    },
    secretaryAlert: {
        type: String
    },
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CENTRE,
        required: true
    },
    idProfession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PROFESSION,
        default: ID_PROFESSION_SPECIALISTE
    },
});

module.exports = mongoose.model(SPECIALITY, specialtyModel);
