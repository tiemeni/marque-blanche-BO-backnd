const mongoose = require('mongoose');

const utilisateurModel = mongoose.Schema({
    civility: {
        type: String,
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
    rights: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require,
            ref: 'Rights'
        }
    ]
});
module.exports = mongoose.model('Utilisateur', utilisateurModel);