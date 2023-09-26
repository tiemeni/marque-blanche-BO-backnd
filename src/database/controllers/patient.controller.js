const patientService = require("../../services/patient.service");
const handler = require("../../commons/response.handler");
const { httpStatus } = require("../../commons/constants");

const createPatient = async (req, res) => {
  const data = req.body;
  try {
    // if user patient exists
    const isPatientExist = await patientService.findOneByQuery({
      email: data.email,
      user: data?.user,
      idCentre: req.idCentre,
    });
    if (isPatientExist)
      return handler.errorHandler(
        res,
        isPatientExist._id,
        httpStatus.BAD_REQUEST
      );

    //create and store the new patient
    const result = await patientService.createPatient({
      ...data,
      idCentre: req.idCentre,
    });
    return handler.successHandler(res, result, httpStatus.CREATED);
  } catch (err) {
    return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deletePatientById = async (req, res) => {
  try {
    const result = await patientService.deleteOne({
      _id: req.params.patientId,
      idCentre: req.idCentre,
    });
    return handler.successHandler(res, result);
  } catch (err) {
    return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getAllPatients = async (req, res) => {
  try {
    const foundPatients = await patientService.findPatients(req.idCentre);
    return handler.successHandler(res, foundPatients);
  } catch (err) {
    return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getPatientById = async (req, res) => {
  try {
    const foundPatient = await patientService.findOneByQuery({
      _id: req.params.patientId,
      idCentre: req.idCentre,
    });
    if (foundPatient == null)
      return handler.errorHandler(res, "No user founded", httpStatus.NOT_FOUND);
    return handler.successHandler(res, foundPatient);
  } catch (err) {
    return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const getPatientByName = async (req, res) => {
  try {
    const foundPatient = await patientService.findOneByQuery({
      name: req.params.key,
      idCentre: req.query.idCentre,
    });
    if (foundPatient == null)
      return handler.errorHandler(res, "No user founded", httpStatus.NOT_FOUND);
    return handler.successHandler(res, foundPatient);
  } catch (err) {
    return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const updatePatient = async (req, res) => {
  try {
    const result = await patientService.updatePatient(
      req.params.patientId,
      req.idCentre,
      { $set: { ...req.body } }
    );
    return handler.successHandler(res, result, httpStatus.CREATED);
  } catch (err) {
    return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteAll = async (req, res) => {
  try {
    const result = await patientService.deletePatients();
    return handler.successHandler(res, result, httpStatus.OK);
  } catch (error) {
    return handler.errorHandler(
      res,
      error.message,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

const searchPatientsByKey = async (req, res) => {
  const key = req.query;
  const formatQuery = (obj) => {
    let res = {};
    Object.keys(obj).forEach((key) => {
      res[key] =
        key?.toString() == "idCentre"
          ? obj[key]
          : { $regex: obj[key], $options: "i" };
    });
    return res;
  };

  const query = formatQuery(key);
  
  try {
    const founds = await patientService.findPatientByQuery(query);
    if (founds) {
      return handler.successHandler(res, founds);
    } else {
      return handler.errorHandler(res, [], 404);
    }
  } catch (error) {
    handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  createPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatient,
  getPatientByName,
  deleteAll,
  searchPatientsByKey,
};
