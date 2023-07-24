const mongoose = require('mongoose');

const specialtyModel = mongoose.Schema({
    label: {
        type: String,
        require
    },
    title: {
        type: String
    },
    reference: {
        type: String
    },
    webAlert: {
        type: String
    },
    secretaryAlert: {
        type: String
    },
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Centre',
        require
    },
});

module.exports = mongoose.model('Specialty', specialtyModel);
