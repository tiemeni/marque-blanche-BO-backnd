const { httpStatus } = require('../../commons/constants');
const handler = require('../../commons/response.handler');
const specialtyService = require('../../services/specialty.service');

const createSpecialty = async (req, res) => {
    const data = req.body
    try {
        const isSpecialtyExist = await specialtyService.findOneByQuery({ title: data.title })
        if (isSpecialtyExist) return handler.errorHandler(res, "Specialty already exist", httpStatus.BAD_REQUEST)

        const result = await specialtyService.createSpecialty(data);
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getAllSpecialties = async (req, res) => {
    try {
        const result = await specialtyService.findSpecialties();
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getOneSpecialty = async (req, res) => {
    try {
        const result = await specialtyService.findSpecialtyById(req.params.id)
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const updateSpecialtyById = async (req, res) => {
    try {
        const result = await specialtyService.updateSpecialty(req.params.id, {
            $set: {
                ...req.body
            }
        });
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const deleteSpecialtyById = async (req, res) => {
    try {
        const result = await specialtyService.deleteOne({ _id: req.params.id });
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        console.log(`Error when deleting ${error}`);
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createSpecialty, getAllSpecialties, updateSpecialtyById, deleteSpecialtyById, getOneSpecialty }
