const mongoose = require('mongoose');

const utilisateurModel = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String
    },
    dateNaiss: {
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
    droits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Droits'
        }
    ]
});
module.exports = mongoose.model('Utilisateur', utilisateurModel);