const mongoose = require('mongoose');

const droitsModel = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateur"
    }
});
module.exports = mongoose.model('Droits', droitsModel);