const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const practicienModel = mongoose.Schema({
    matricule: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    prixDefault: {
        type: Int32,
        required: true
    },
    idUtilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    idSpecialite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialite'
    }
});