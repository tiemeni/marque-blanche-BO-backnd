const mongoose = require('mongoose');

const fichePatientModel = mongoose.Schema({
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
        type: String,
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
    ],
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Centre',
        require
    }
});
module.exports = mongoose.model('FichePatient', fichePatientModel);