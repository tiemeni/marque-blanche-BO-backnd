const { httpStatus } = require('../commons/constants')
const { errorHandler } = require('../commons/response.handler')
const { findCentreById } = require('../services/structure.service')

module.exports = async (req, res, next) => {
    if ((!req.query.idCentre || req.query.idCentre == null) && !req.query.module )
        return errorHandler(res, "Veuillez renseigner l'identifiant du centre", httpStatus.OK)

    if ((!req.query.idCentre || req.query.idCentre == null) && req.query.module )
        next();
    
    if(req.query.idCentre) {
        const { idCentre } = req.query;
        const isExist = await findCentreById(idCentre);

        if (!isExist) errorHandler(res, "Veuillez renseigner un identifiant de centre valide", httpStatus.OK)

        req.idCentre = idCentre;
        next()
    }
}
