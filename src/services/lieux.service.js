const Lieu = require('../database/models/lieu.model');
const { encryptPassword } = require('../commons/auth');

module.exports = {
    createLieu: async (lieu) => {
        let newUser = new Lieu(lieu);
        return await newUser.save();
    },
    findOneByQuery: async (query) => {
        return await Lieu.findOne(query);
    },
    findLieuById: async (id) => {
        return await Lieu.findById(id);
    },
    findLieuByQuery: async (query) => {
        return await Lieu.find(query);
    },
    findLieus: async () => {
        return await Lieu.find({});
    },
    updateLieu: async (id, query) => {
        return await Lieu.findOneAndUpdate({ _id: id }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await Lieu.deleteOne(query);
    },
    deleteLieux: async () => {
        return await Lieu.deleteMany({});
    }
}