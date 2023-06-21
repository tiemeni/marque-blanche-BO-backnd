const mongoose = require('mongoose');

const paiementModel = mongoose.Schema({
    moyen: {
        type: String,
        required: true,
    },
    idUtilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Centre'
    }
});
module.exports = mongoose.model('Paiement', paiementModel);