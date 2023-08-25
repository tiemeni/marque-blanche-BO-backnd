const cron = require('node-cron')
const axios = require('axios')
const handler = require("../../commons/response.handler")
const { httpStatus } = require("../../commons/constants")
const { calculateAvailability, formatDate, replaceIfEmpty, formatQuery } = require("../../helpers")
const appointementService = require("../../services/appointment.service")
const userService = require("../../services/user.service")
const { format } = require("date-fns");
const patientService = require("../../services/patient.service")
const appointmentService = require("../../services/appointment.service")
const expoPushEndpoint = 'https://exp.host/--/api/v2/push/send';
const formatTz = require('date-fns-tz/format')

const timeZone = "Africa/Douala"

// Tâche cron pour vérifier les rendez-vous dans la prochaine heure
const task = cron.schedule('* * * * *', async () => {
    const currentTime = new Date();
    const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);

    
    const start = formatTz(currentTime, "yyyy-MM-dd'T'HH:mm", timeZone)
    const end = formatTz(nextHour, "yyyy-MM-dd'T'HH:mm", timeZone)
    
    const appointments = await appointementService.findByQuery({
        date_long: {
            $gte: start,
            $lte: end,
        },
    })

    appointments.forEach(async (appointment) => {
        const patient = await patientService.findPatientById(appointment.patient._id)
        if (!patient) {
            console.error('Utilisateur non trouvé pour le rendez-vous');
            return;
        }

        const userExpoToken = patient?.user?.expoToken;
        const alreadySent = appointment.sent;
        if (userExpoToken && !alreadySent) {
            const notification = {
                to: userExpoToken,
                title: 'Rappel de Rendez-vous',
                body: `Votre rendez-vous avec le Dr. ${appointment.practitioner.name} commence dans une heure: ${appointment?.motif?.nom}`,
            };

            try {
                const response = await axios.post(expoPushEndpoint, notification, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                const responseData = await response.data;
                appointment.sent = true;
                appointment.save()
                console.log('Notification envoyée avec succès:', responseData);
            } catch (error) {
                console.error('Erreur lors de l\'envoi de la notification:', error.message);
            }
        }
    })
});

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
            dayOfWeek: new Date(data.date).getDay(),
            center: req.idCentre,
            created_at: formatTz(new Date(), "yyyy-MM-dd'T'HH:mm", timeZone)
        })

        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const upadteAppointment = async (req, res) => {
    const data = req.body;
    console.log(req.params.idRdv, req.query.idCentre)
    try {
        const result = await appointementService.editeOneByQuery(req.params.idRdv, req.query.idCentre, {
            ...data,
        })
        const formatedData = {
            id: result?._id,
            civility: result?.practitioner?.civility?.label,
            name: result?.practitioner?.name,
            surname: result?.practitioner?.surname,
            profession: result?.practitioner?.job?.title,
            patient: result?.patient,
            motif: result?.motif?.label,
            timeStart: result?.startTime,
            timeEnd: result?.endTime,
            idCentre: result?.patient?.idCentre,
            date: result?.date,
            displayedDate: formatDate(result?.date) + " à " + result?.startTime,
            provenance: result?.provenance,
            wasMoved: result?.wasMoved,
            resourceId: result?.practitioner?._id,
            status: result?.status,
            created_at: result.created_at,
        }

        return handler.successHandler(res, formatedData, httpStatus.CREATED)
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
    let query = {}

    // Si des filtres sont definis
    if (req?.idCentre) query['center'] = req.idCentre;
    if (req.query.idp) query['practitioner'] = { $in: req.query.idp.split(",") }
    if (req.query.idpatient) query['patient'] = { $in: req.query.idpatient.split(",") }
    if (req.query.idRdv) query["_id"] = req.query.idRdv

    // Get des fiches patients
    if (req.query.iduser) {
        const patients = await patientService.findPatientByQuery({ user: req.query.iduser })
        const idList = patients.map(({ _id }) => _id)

        if (idList.length === 0) return handler.successHandler(res, [], httpStatus.OK)
        query['patient'] = { $in: idList }
    }

    try {
        const appointments = await appointementService.findByQuery(query)
        let result = []

        for (const appointment of appointments) {
            const { practitioner } = appointment
            const { civility } = practitioner
            result.push({
                _id: appointment._id,
                civility: civility?.abreviation || civility?.label,
                name: practitioner.name,
                surname: practitioner.surname,
                profession: practitioner.job.title,
                patient: appointment.patient,
                motif: appointment.motif.label,
                timeStart: appointment.startTime,
                timeEnd: appointment.endTime,
                idCentre: appointment?.centre ?? "",
                lieu: appointment.lieu,
                date: appointment.date,
                displayedDate: formatDate(appointment.date) + " à " + appointment.startTime,
                duration: appointment.duration,
                provenance: appointment.provenance,
                wasMoved: appointment.wasMoved,
                resourceId: practitioner._id,
                status: appointment.status,
                created_at: appointment.created_at,
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
 * @param {*} req
 * @param {*} res
 * @var idp identifiant du praticien 
 * @var idLieu identifiant du lieu 
 * @var idMotif identifiant du lieu 
 * @var startDate date de début des rdvs
 * @var slotRange creneau de rdv
 * @var day jour du rdv
 * @returns listes de disponibilites
 */
const searchAvailabilities = async (req, res) => {
    let appointements = [];
    let practitioner = {};
    let availabilities = [];
    const { query, startDate, endOfInterval, daysTab, querySlot } = formatQuery(req)

    practitioner = await userService.findUserById(req.query.idp);
    appointements = await appointementService.findByQuery(query);

    // Grouper les rdvs par jour
    const groupedRdv = {};
    appointements.forEach(rdv => {
        const d = format(rdv.date, "yyyy-MM-dd")
        if (!groupedRdv[d]) {
            groupedRdv[d] = [];
        }
        groupedRdv[d].push(rdv);
    });

    // Si rdvs non trouvés pour certains jours remplacer par []
    const slot = daysTab ? daysTab : { start: startDate, end: endOfInterval }
    const rdvs = replaceIfEmpty(groupedRdv, slot)

    availabilities = calculateAvailability(practitioner, rdvs, querySlot);

    if (availabilities.length === 0) {
        let errMsg = "Aucune disponibilité avec ce praticien"
        const Filterlength = Object.keys(query).length
        if (Filterlength > 2) errMsg = "Aucune disponibilité selon vos critères de recherche"
        return handler.errorHandler(res, errMsg, httpStatus.NOT_FOUND)
    }

    return handler.successHandler(res, availabilities, httpStatus.OK)
}

/**
 * Fonction de personnel de modification des anciens enregistrements en cas d'ajout d'une variable
 */
async function updateExistingAppointments() {
    try {
        const appointmentsToUpdate = await appointementService.findAll({ create_at: { $exists: false } });

        for (const appointment of appointmentsToUpdate) {
            appointment.create_at = formatTz(new Date(), "yyyy-MM-dd'T'HH:mm", timeZone)
            await appointment.save();
        }

        console.log("Mise à jour des enregistrements terminée.");
    } catch (error) {
        console.error("Erreur lors de la mise à jour des enregistrements :", error);
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

const deleteOne = async (req, res) => {
    try {
        const result = await appointmentService.findAndDelete(req.params.id, { center: req.idCentre })
        return handler.successHandler(res, result, httpStatus.OK)
    } catch (error) {
        return handler.errorHandler(res, error.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { makeAppointment, presaveAppointment, upadteAppointment, searchAvailabilities, deleteAll, getAppointments, updateExistingAppointments, deleteOne }
