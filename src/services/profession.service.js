const Profession = require('../database/models/profession.model');

module.exports = {
    createProfession: async (data) => {
        let profession = new Profession(data);
        return await profession.save();
    },
    findOneByQuery: async (query) => {
        return await Profession.findOne(query);
    },
    findProfessions: async () => {
        return await Profession.find({});
    },
    deleteOne: async (query) => {
        return await Profession.deleteOne(query);
    },
}