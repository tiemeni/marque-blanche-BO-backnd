const { httpStatus } = require('../../commons/constants');
const handler = require('../../commons/response.handler');
const rightService = require('../../services/right.service');

const createRight = async (req, res) => {
    const data = req.body;
    try {
        const isRightExist = await rightService.findOneByQuery({ title: data.title })
        if (isRightExist) return handler.errorHandler(res, "Right already exist", httpStatus.BAD_REQUEST)

        const result = await rightService.createRight({ ...data })
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getAllRights = async (req, res) => {
    try {
        const result = await rightService.findRights();
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getOneRight = async (req, res) => {
    try {
        const result = await rightService.findRightById(req.params.id);
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const updateRight = async (req, res) => {
    try {
        const result = await rightService.updateRight(req.params.id, {
            $set: {
                ...req.body
            }
        })
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createRight, getAllRights, getOneRight, updateRight };