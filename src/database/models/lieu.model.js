const mongoose = require('mongoose');

const lieuModel = mongoose.Schema({
    label: {
        type: String,
        require
    },
    ville: {
        type: String,
        require
    },
    region: {
        type: String,
    },
    codePostal: {
        type: String,
    },
    reference: {
        type: String,
        require
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
        require
    },
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Centre',
        require
    }
});
module.exports = mongoose.model('Lieu', lieuModel);