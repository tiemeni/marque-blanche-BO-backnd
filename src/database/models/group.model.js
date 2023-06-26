const mongoose = require('mongoose');

const groupModel = mongoose.Schema({
    title: {
        type: String,
        require
    },
    rights: [{
        type: mongoose.Types.ObjectId,
        ref: 'Rights',
    }],
})

module.exports = mongoose.model('Groups', groupModel);