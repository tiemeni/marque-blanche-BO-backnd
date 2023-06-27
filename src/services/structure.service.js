const Centre = require('../database/models/centre.model');
const { encryptPassword } = require('../commons/auth');

module.exports = {
    createCentre: async (centre) => {
        let newCentre = new Centre(centre);
        return await newCentre.save();
    },
    findCentreById: async (id) => {
        return await Centre.findById(id);
    },
    findCentres: async () => {
        return await Centre.find({});
    },
    findOneByQuery: async (query) => {
        return await Centre.findOne(query);
    },
    updateCentre: async (id, query) => {
        return await Centre.findOneAndUpdate({ _id: id }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await Centre.deleteOne(query);
    },
    deleteCentres: async () => {
        return await Centre.deleteMany({});
    }
}