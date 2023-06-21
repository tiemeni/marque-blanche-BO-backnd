const mongoose = require('mongoose');

const agendaModel = mongoose.Schema({
    idPracticien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practicien'
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
module.exports = mongoose.model('Agenda', agendaModel);