const mongoose = require('mongoose');

const groupModel = mongoose.Schema({
    name: {
        type: String,
        require
    },
    description: {
    type: String,
    required: true
    },
    rights: [{
        type: mongoose.Types.ObjectId,
        ref: 'Rights',
    }],
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Centre',
        require
    }
})

module.exports = mongoose.model('Groups', groupModel);
