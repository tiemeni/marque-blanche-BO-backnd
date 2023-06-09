const motifService = require("../../services/motif.service");
const handler = require('../../commons/response.handler')
const { httpStatus } = require('../../commons/constants')


const createMotif = async (req, res) => {
    const data = req.body
    try {
        // if centre already exists
        const isMotifExist = await motifService.findOneByQuery({ nom: data.nom })
        if (isMotifExist) return handler.errorHandler(res, "motif already exist", httpStatus.BAD_REQUEST)

        //create and store the new structure
        const result = await motifService.createMotif({ ...data });

        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}


const deleteMotifById = async (req, res) => {
    try {
        const result = await motifService.deleteOne({ _id: req.params.motifId });
        return handler.successHandler(res, result)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}


const getAllMotifs = async (req, res) => {
    try {
        const foundMotifs = await motifService.findMotifs();
        return handler.successHandler(res, foundMotifs)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getMotifById = async (req, res) => {
    try {
        const foundMotif = await motifService.findOneByQuery({ _id: req.params.motifId });
        if (foundMotif == null) return handler.errorHandler(res, 'No motif found', httpStatus.NOT_FOUND);
        return handler.successHandler(res, foundMotif)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const updateMotifById = async (req, res) => {
    try {
        const result = await motifService.updateMotif(req.params.motifId, { $set: { ...req.body } });
        return handler.successHandler(res, result, httpStatus.CREATED);
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}



module.exports = { createMotif, deleteMotifById, getAllMotifs, getMotifById, updateMotifById }