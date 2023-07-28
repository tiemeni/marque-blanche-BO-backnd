const mongoose = require('mongoose');
const { PRATICIEN, CENTRE, SPECIALITY, USER } = require('../../constants/entity');

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
        ref: USER
    },
    idSpecialite: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "veuillez choisir un droits"],
            ref: SPECIALITY
        }
    ], 
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CENTRE,
        required:true
    }
});

module.exports = mongoose.model(PRATICIEN, practicienModel);
