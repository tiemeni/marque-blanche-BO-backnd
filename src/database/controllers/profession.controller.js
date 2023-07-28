const professionService = require("../../services/profession.service");
const handler = require("../../commons/response.handler");
const { httpStatus } = require("../../commons/constants");

const createProfession = async (req, res) => {
    const data = req.body;
    try {
        const isExist = await professionService.findOneByQuery({ name: data.name })
        if (isExist) return handler.errorHandler(res, "Profession already exists", httpStatus.BAD_REQUEST)

        const result = await professionService.createProfession({ ...data })
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getProfessions = async (_req, res) => {
    try {
        const result = await professionService.findProfessions();
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const deleteProfessionById = async (req, res) => {
    try {
        const result = await professionService.deleteOne({ _id: req.params.idProfession });
        return handler.successHandler(res, result)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}



module.exports = { createProfession, getProfessions, deleteProfessionById }