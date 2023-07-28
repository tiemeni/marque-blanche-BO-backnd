const mongoose = require('mongoose');
const { CIVILITY } = require('../../constants/entity');

const CivilityModel = mongoose.Schema({
    label: {
        type: String,
        require
    },
    abreviation: {
        type: String,
    }
})

module.exports = mongoose.model(CIVILITY, CivilityModel);