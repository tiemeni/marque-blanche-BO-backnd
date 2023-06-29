const mongoose = require('mongoose');

const practicienModel = mongoose.Schema({
    matricule: {
        type: String,
        required: [true, "veillez entrer un matricule"]
    },
    status: {
        type: String,
        required: [true, "veillez entrer un status"]
    },
    prixDefault: {
        type: Number,
        required: [true, "veillez entrer un prix par default"]
    },
    idUtilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    idSpecialite: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "veuillez choisir un droits"],
            ref: 'Specialite'
        }
    ]
});

module.exports = mongoose.model('Practicien', practicienModel);
