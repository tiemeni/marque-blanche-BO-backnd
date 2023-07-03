const mongoose = require('mongoose');

const utilisateurModel = mongoose.Schema({
    civility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Civilities',
        require
    },
    name: {
        type: String,
        require
    },
    surname: {
        type: String,
        require
    },
    birthdate: {
        type: Date,
    },
    telephone: {
        type: String,
    },
    email: {
        type: String,
        require
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
    active: {
        type: Boolean,
        require
    },
    groups: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groups',
        require
    }
});
module.exports = mongoose.model('User', utilisateurModel);