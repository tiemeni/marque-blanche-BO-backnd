const mongoose = require('mongoose');

const motifModel = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    couleur: {
        type: String
    }
});
module.exports = mongoose.model('Motif', motifModel);