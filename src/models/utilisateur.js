const mongoose = require('mongoose');

const utilisateurModel = mongoose.Schema({
    nom: {
        type: String,
        required: [true, "veuillez entrer votre nom"]
    },
    prenom: {
        type: String
    },
    dateNaiss: {
        type: Date,
        required: [true, "veuillez entrer votre date de naissance"]
    },
    sexe: {
        type: String,
        required: [true, "veuillez entrer votre sexe"]
    },
    telephone: {
        type: String,
        required: [true, "veuillez entrer votre contact"]
    },
    ville: {
        type: String,
        required: [true, "veuillez entrer votre ville"]
    },
    email: {
        type: String,
        required: [true, "veuillez entrer votre email"]
    },
    password: {
        type: String,
        required: [true, "veuillez entrer votre un mot de passe"]
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