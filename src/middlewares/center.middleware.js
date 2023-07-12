const { httpStatus } = require('../commons/constants')
const { errorHandler } = require('../commons/response.handler')

module.exports = async (req, res, next) => {
    if (!req.query.idCentre)
        return errorHandler(res, "Veuillez renseigner l'identifiant du centre", httpStatus.BAD_REQUEST)

    req.idCentre = req.query.idCentre;
    next()
}