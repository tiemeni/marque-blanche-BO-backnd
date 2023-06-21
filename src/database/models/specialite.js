const mongoose = require('mongoose');

const specialiteModel = mongoose.Schema({
    nom: {
        type: String,
        required: [true, "veuillez entrer un nom"]
    },
    practicien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Practicien"
    }
});

module.exports = mongoose.model('Specialite', specialiteModel);