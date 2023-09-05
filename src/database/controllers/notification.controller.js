const notificationService = require('../../services/notification.service')
const handler = require('../../commons/response.handler')
const { httpStatus } = require('../../commons/constants')
const notificationType = require('../../commons/notification.type')
const patientService = require('../../services/patient.service')

const createNofitication = async (req, res) => {
    const { title, content, appointment, type } = req.body
    try {
        const notification = await notificationService.create({
            title: title,
            content: content,
            user: req.query.iduser,
            appointment: appointment,
            type: type
        })

        return handler.successHandler(res, notification, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error)
    }
}

const getNotifications = async (req, res) => {
    try {
        const patients = await patientService.findPatientByQuery({ user: req.query.iduser })
        const idList = patients.map(({ _id }) => _id)

        const result = await notificationService.getByQuery({ receiver: { $in: idList } })
        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (error) {
        return handler.errorHandler(res, error)
    }
}

module.exports = { getNotifications, createNofitication }