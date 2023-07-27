const Lieu = require('../database/models/lieu.model');

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
    findLieus: async (idc) => {
        return await Lieu.find({ idCentre: idc });
    },
    updateLieu: async (id, idc, query) => {
        return await Lieu.findOneAndUpdate({ _id: id, idCentre: idc }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await Lieu.deleteOne(query);
    },
    deleteLieux: async () => {
        return await Lieu.deleteMany({});
    }
}