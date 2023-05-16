const mongoose = require('mongoose');

const fichePatientModel = mongoose.Schema({
    idRdv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RDV'
    }
});
module.exports = mongoose.model('FichePatient', fichePatientModel);