const mongoose = require('mongoose');
const { AGENDA, PRATICIEN } = require('../../constants/entity');

const agendaModel = mongoose.Schema({
    idPracticien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PRATICIEN
    },
    dateDebutActivites: {
        type: Date,
        required: true
    },
    dateFinActivites: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model(AGENDA, agendaModel);