const mongoose = require('mongoose');

const specialiteModel = mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Specialite', specialiteModel);