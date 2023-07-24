const mongoose = require('mongoose');

const fichePatientModel = mongoose.Schema({
    civility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Civilities",
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