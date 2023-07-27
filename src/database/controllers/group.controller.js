const { httpStatus } = require('../../commons/constants');
const handler = require('../../commons/response.handler');
const groupService = require('../../services/group.service');

const createGroup = async (req, res) => {
    const data = req.body;
    try {
        const isGroupExist = await groupService.findOneByQuery({ title: data.title, idCentre: req.idCentre })
        if (isGroupExist) return handler.errorHandler(res, "Group already exist", httpStatus.BAD_REQUEST)

        const result = await groupService.createGroup({ ...data, idCentre: req.idCentre })
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getAllGroup = async (req, res) => {
    try {
        const result = await groupService.findGroupsByQuery({ idCentre: req.idCentre })
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getGroupById = async (req, res) => {
    try {
        const result = await groupService.findGroupById(req.params.id)
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const updateGroup = async (req, res) => {
    try {
        const result = await groupService.updateGroup(req.params.id, req.idCentre, {
            $set: {
                ...req.body
            }
        })
        return handler.successHandler(res, result, httpStatus.ACCEPTED)
    } catch (error) {
        return handler.errorHandler(res, error, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createGroup, updateGroup, getAllGroup, getGroupById }