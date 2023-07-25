const Specialty = require('../database/models/specialty.model');

module.exports = {
    createSpecialty: async (data) => {
        let specialty = new Specialty(data);
        return await specialty.save();
    },
    findOneByQuery: async (query) => {
        return await Specialty.findOne(query);
    },
    findSpecialtyById: async (id) => {
        return await Specialty.findById(id);
    },
    findSpecialtyByQuery: async (query) => {
        return await Specialty.find(query);
    },
    findSpecialties: async (idc) => {
        return await Specialty.find({ idCentre: idc });
    },
    updateSpecialty: async (id, idc, query) => {
        return await Specialty.findOneAndUpdate({ _id: id, idCentre: idc }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await Specialty.deleteOne(query);
    },
    deleteSpecialtys: async () => {
        return await Specialty.deleteMany({});
    },
}