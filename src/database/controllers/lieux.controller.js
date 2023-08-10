const lieuService = require("../../services/lieux.service");
const handler = require('../../commons/response.handler')
const { httpStatus } = require('../../commons/constants')


const createLieu = async (req, res) => {
    const data = req.body
    try {
        // if lieu already exists
        const isLieuExist = await lieuService.findOneByQuery({ reference: data.reference, idCentre: req.idCentre })
        if (isLieuExist) return handler.errorHandler(res, "lieu already exist", httpStatus.BAD_REQUEST)

        //create and store the new lieu
        const result = await lieuService.createLieu({ ...data, idCentre: req.idCentre });

        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}


const deleteLieuById = async (req, res) => {
    try {
        const result = await lieuService.deleteOne({ _id: req.params.lieuId, idCentre: req.idCentre });
        return handler.successHandler(res, result)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}


const getAllLieux = async (req, res) => {
    try {
        const condition = req.idCentre ? { idCentre: req.idCentre } : {}
        const foundLieux = await lieuService.findLieuByQuery(condition);
        return handler.successHandler(res, foundLieux)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getLieuById = async (req, res) => {
    try {
        const condition = req.idCentre ? { _id: req.params.lieuId, idCentre: req.idCentre } : { _id: req.params.lieuId }
        const foundLieu = await lieuService.findOneByQuery(condition);
        if (foundLieu == null) return handler.errorHandler(res, 'No lieu founded', httpStatus.NOT_FOUND);
        return handler.successHandler(res, foundLieu)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const updateLieuById = async (req, res) => {
    try {
        const result = await lieuService.updateLieu(req.params.lieuId, req.idCentre, { $set: { ...req.body } });
        return handler.successHandler(res, result, httpStatus.CREATED);
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}



module.exports = { createLieu, deleteLieuById, getAllLieux, getLieuById, updateLieuById }