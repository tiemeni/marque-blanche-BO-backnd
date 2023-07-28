const mongoose = require('mongoose');
const { PROFESSION, MOTIF } = require('../../constants/entity');

const motifModel = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    couleur: {
        type: String
    },
    default_time: {
        type: String,
        required: true
    },
    reference: {
        type: String,
    },
    active: {
        type: Boolean,
        required: true
    },
    idProfession: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: PROFESSION
    }
});
module.exports = mongoose.model(MOTIF, motifModel);
