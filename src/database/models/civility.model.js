const mongoose = require('mongoose');

const CivilityModel = mongoose.Schema({
    label: {
        type: String,
        require
    },
})

module.exports = mongoose.model('Civilities', CivilityModel);