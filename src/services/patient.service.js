const Patient = require('../database/models/fichePatient');
const { encryptPassword } = require('../commons/auth');

module.exports = {
    createPatient: async (patient) => {
        let newPatient = new Patient(patient);
        return await newPatient.save();
    },
    findOneByQuery: async (query) => {
        return await Patient.findOne(query);
    },
    findPatientById: async (id) => {
        return await Patient.findById(id).select('-password').populate("user");
    },
    findPatientByQuery: async (query) => {
        return await Patient.find(query).select('-password');
    },
    findPatients: async (idc) => {
        return await Patient.find({ idCentre: idc }).select('-password').populate("civility");
    },
    updatePatient: async (id, idc, query) => {
        return await Patient.findOneAndUpdate({ _id: id, idCentre: idc }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await Patient.deleteOne(query);
    },
    deletePatients: async () => {
        return await Patient.deleteMany({});
    }
}