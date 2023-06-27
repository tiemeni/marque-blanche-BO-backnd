const structureService = require("../../services/structure.service");
const handler = require('../../commons/response.handler')
const { httpStatus } = require('../../commons/constants')


const createStructure = async (req, res) => {
    const data = req.body
    try {
        // if centre already exists
        const isstructureExist = await structureService.findOneByQuery({ email: data.email })
        if (isstructureExist) return handler.errorHandler(res, "structure already exist", httpStatus.BAD_REQUEST)

        //create and store the new structure
        const result = await structureService.createCentre({ ...data });

        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}


const deleteStructureById = async (req, res) => {
    try {
        const result = await structureService.deleteOne({ _id: req.params.centreId });
        return handler.successHandler(res, result)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}


const getAllStructures = async (req, res) => {
    try {
        const foundStructures = await structureService.findCentres();
        return handler.successHandler(res, foundStructures)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getStructureById = async (req, res) => {
    try {
        const foundStructure = await structureService.findOneByQuery({ _id: req.params.centreId });
        if (foundStructure == null) return handler.errorHandler(res, 'No structure founded', httpStatus.NOT_FOUND);
        return handler.successHandler(res, foundStructure)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const updateStructureById = async (req, res) => {
    try {
        const result = await structureService.updateCentre(req.params.centreId, { $set: { ...req.body } });
        return handler.successHandler(res, result, httpStatus.CREATED);
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}



module.exports = { createStructure, deleteStructureById, getAllStructures, getStructureById, updateStructureById }