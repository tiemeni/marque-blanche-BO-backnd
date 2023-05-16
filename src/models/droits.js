const mongoose = require('mongoose');

const droitsModel = mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Droits', droitsModel);