const handler = require("../../commons/response.handler")
const { httpStatus } = require("../../commons/constants")
const { calculateAvailability, formatDate } = require("../../helpers")
const appointementService = require("../../services/appointment.service")
const userService = require("../../services/user.service")

/**
 * Enregistrer un rendez-vous
 */
const makeAppointment = async (req, res) => {
    // Code here
    const data = req.body;

    try {
        const isExist = await appointementService.findOneByQuery({
            startTime: data.startTime,
            practitioner: data.practitioner,
            center: data.center
        });
        if (isExist) return handler.errorHandler(res, 'Ce rendez-vous a déjà été pris', httpStatus.NOT_ACCEPTABLE)

        const result = await appointementService.createAppointment({
            ...data,
            center: req.idCentre
        })

        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

/**
 * Récuperer les rendez-vous des praticiens par filtre s'ils sont définis
 * @param idCentre
 * @param practitioner 
 * @param patient 
 * @param idRdv 
 * @returns tableau de rendex-vous
 */
const getAppointments = async (req, res) => {
    let query = { center: req.idCentre }

    console.log("query", req.query)

    // Si des filtres sont definis
    if (req.query.idp) query['practitioner'] = { $in: req.query.idp.split(",") }
    if (req.query.idpatient) query['patient'] = req.query.idpatient
    if (req.query.idRdv) query["_id"] = req.query.idRdv

    try {
        const appointments = await appointementService.findByQuery(query)
        let result = []

        for (const appointment of appointments) {
            const { practitioner } = appointment
            const { civility } = practitioner
            result.push({
                _id: appointment._id,
                civility: civility?.abreviation || civility.label,
                name: practitioner.name,
                surname: practitioner.surname,
                patient: appointment.patient,
                motif: appointment.motif.label,
                timeStart: appointment.startTime,
                timeEnd: appointment.endTime,
                date: appointment.date,
                displayedDate: formatDate(appointment.date) + " à " + appointment.startTime,
                duration: appointment.duration,
                provenance: appointment.provenance,
                wasMoved: appointment.wasMoved,
                resourceId: practitioner._id
            })
        }

        return handler.successHandler(res, result, httpStatus.OK)

    } catch (error) {
        return handler.errorHandler(res, error.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}


/**
 * Pre-enregistrer un rendez-vous
 */
const presaveAppointment = (req, res) => {
    // Code here
}

/**
 * Rechercher des disponibilites en fonction du praticien
 */
const searchAvailabilities = async (req, res) => {
    const { practitioner, filter } = req.body;
    let appointements = [];
    let infoPraticien = {};
    let availabilities = [];
    let data = [];
    const query = filter ? { ...filter } : {};

    if (praticien !== 0) {
        appointements = await appointementService.findByQuery({ _id: praticien, date: new Date(), ...query });
        infoPraticien = await userService.findUserById(practitioner);
        availabilities = calculateAvailability(infoPraticien, appointements);

        if (availabilities.length === 0) return handler.errorHandler(res, "Aucune disponibilité avec ce praticien", httpStatus.NOT_FOUND)

        for (const availability of availabilities) {
            data.push({
                practitioner: infoPraticien.civilite.name + " " + infoPraticien.name + " " + infoPraticien.surname,
                date: formatDate(new Date()),
                startTime: availability,
            })
        }
    }
}

const deleteAll = async (req, res) => {
    try {
        const result = await appointementService.deleteAll();
        return handler.successHandler(res, result, httpStatus.OK)
    } catch (error) {
        return handler.errorHandler(res, error.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { makeAppointment, presaveAppointment, searchAvailabilities, deleteAll, getAppointments }
