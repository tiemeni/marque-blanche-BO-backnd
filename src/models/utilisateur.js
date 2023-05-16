const mongoose = require('mongoose');

const utilisateurModel = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    date_naiss: {
        type: Date,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    idDroits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Droits'
        }
    ]
});
module.exports = mongoose.model('Utilisateur', utilisateurModel);