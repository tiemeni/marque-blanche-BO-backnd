const mongoose = require('mongoose');

const utilisateurModel = mongoose.Schema({
    civilite: {
        type: String,
        require
    },
    nom: {
        type: String,
        required: [true, "veuillez entrer votre nom"]
    },
    prenom: {
        type: String,
        require
    },
    dateNaiss: {
        type: Date,
    },
    telephone: {
        type: String,
    },
    ville: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "veuillez entrer votre email"]
    },
    password: {
        type: String,
    },
    initiales: {
        type: String
    },
    photo: {
        contentType: String,
        data: Buffer
    },
    actif: {
        type: Boolean,
        required: [true, "veuillez entrer votre status"]
    },
    droits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "veuillez choisir un droits"],
            ref: 'Droits'
        }
    ]
});
module.exports = mongoose.model('Utilisateur', utilisateurModel);