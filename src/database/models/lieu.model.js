const mongoose = require('mongoose');
const { LIEU, CENTRE } = require('../../constants/entity');

const lieuModel = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    region: {
        type: String,
    },
    codePostal: {
        type: String,
    },
    reference: {
        type: String,
        required: true
    },
    initiales: {
        type: String
    },
    geoCoordonnes: {
        contentType: String,
        data: Buffer
    },
    active: {
        type: Boolean,
        required: true
    },
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CENTRE,
        required: true
    },
    location: {
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        },
    }
});
module.exports = mongoose.model(LIEU, lieuModel);