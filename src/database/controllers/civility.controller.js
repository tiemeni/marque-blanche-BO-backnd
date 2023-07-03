const civilityService = require("../../services/civility.service");
const handler = require("../../commons/response.handler");
const { httpStatus } = require("../../commons/constants");

const createCivility = async (req, res) => {
    const data = req.body;
    try {
        const isExist = await civilityService.findOneByQuery({ title: data.label })
        if (isExist) return handler.errorHandler(res, "Civility already exist", httpStatus.BAD_REQUEST)

        const result = await civilityService.createCivility({ ...data })
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getCivilities = async (req, res) => {
    try {
        const result = await civilityService.findCivilities();
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createCivility, getCivilities }