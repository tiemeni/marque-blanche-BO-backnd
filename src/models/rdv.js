const mongoose = require('mongoose');

const rdvModel = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    idUtilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Centre'
    },
    idPracticien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practicien'
    },
    idMotif: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Motif'
    },
    creneau: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('RDV', rdvModel);