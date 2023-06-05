const mongoose = require('mongoose');

const specialiteModel = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    practicien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Practicien"
    }
});

module.exports = mongoose.model('Specialite', specialiteModel);