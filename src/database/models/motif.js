const mongoose = require('mongoose');

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
    }
});
module.exports = mongoose.model('Motif', motifModel);
