const Patient = require('../database/models/fichePatient');
const { encryptPassword } = require('../commons/auth');

module.exports = {
    createPatient: async (patient) => {
        Patient.password = await encryptPassword(patient.password);
        let newPatient = new Patient(patient);
        return await newPatient.save();
    },
    findOneByQuery: async (query) => {
        return await Patient.findOne(query);
    },
    findPatientById: async (id) => {
        return await Patient.findById(id).select('-password');
    },
    findPatientByQuery: async (query) => {
        return await Patient.find(query).select('-password');
    },
    findPatients: async () => {
        return await Patient.find({}).select('-password');
    },
    updatePatient: async (id, query) => {
        return await Patient.findOneAndUpdate({ _id: id }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await Patient.deleteOne(query);
    },
    deletePatients: async () => {
        return await Patient.deleteMany({});
    }
}