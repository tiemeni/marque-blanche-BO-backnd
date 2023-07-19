const mongoose = require('mongoose');

const CivilityModel = mongoose.Schema({
    label: {
        type: String,
        require
    },
    abreviation: {
        type: String,
    }
})

module.exports = mongoose.model('Civilities', CivilityModel);