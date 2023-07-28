const mongoose = require('mongoose');
const { PRATICIEN, CENTRE } = require('../../constants/entity');

const centreModel = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    localisation: {
        type: String,
        required: true
    },
    typeCentre: {
        type: String,
        required: true
    },
    addresse: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    raisonSocial: {
        type: String,
        required: true
    },
    idPracticien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PRATICIEN
    },
    urlSite: String,
    formeJuridque: String
});
module.exports = mongoose.model(CENTRE, centreModel);