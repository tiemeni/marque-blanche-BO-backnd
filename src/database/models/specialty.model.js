const mongoose = require('mongoose');

const specialtyModel = mongoose.Schema({
    title: {
        type: String,
        require
    },
    webAlert: {
        type: String
    },
    secretaryAlert: {
        type: String
    }
});

module.exports = mongoose.model('Specialty', specialtyModel);