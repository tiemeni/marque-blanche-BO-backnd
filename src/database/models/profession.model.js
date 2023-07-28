const mongoose = require('mongoose');

const professionModel = mongoose.Schema({
    name: {
        type: String,
        require
    },
})

module.exports = mongoose.model('Profession', professionModel);