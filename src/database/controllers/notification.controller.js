const notificationService = require("../../services/notification.service");
const handler = require("../../commons/response.handler");
const { httpStatus } = require("../../commons/constants");
const notificationType = require("../../commons/notification.type");
const patientService = require("../../services/patient.service");

const createNofitication = async (req, res) => {
  const { title, content, appointment, type } = req.body;
  try {
    const notification = await notificationService.create({
      title: title,
      content: content,
      user: req.query.iduser,
      appointment: appointment,
      type: type,
    });

    return handler.successHandler(res, notification, httpStatus.CREATED);
  } catch (error) {
    return handler.errorHandler(res, error);
  }
};

const getNotifications = async (req, res) => {
  try {
    const idList = await extractFiches(req.query.iduser);

    const result = await notificationService.getByQuery({
      receiver: { $in: idList },
    });
    return handler.successHandler(res, result, httpStatus.CREATED);
  } catch (error) {
    return handler.errorHandler(res, error);
  }
};

const getNumbersUnreadedNotifications = async (req, res) => {
  try {
    const idList = await extractFiches(req.query.iduser);
    const result = await notificationService.getByQuery({
      receiver: { $in: idList },
      unreaded: true,
    });

    return handler.successHandler(
      res,
      { unreaded: result.length },
      httpStatus.OK
    );
  } catch (error) {
    return handler.errorHandler(res, error);
  }
};

const markNotificationsAsReaded = async (req, res) => {
  try {
    const idList = await extractFiches(req.query.iduser);
    await notificationService.updateNotifications(
      { receiver: { $in: idList } },
      { $set: { unreaded: false } }
    );

    return handler.successHandler(
      res,
      "Notifications marqués comme lues.",
      httpStatus.OK
    );
  } catch (error) {
    return handler.errorHandler(res, error);
  }
};

const extractFiches = async (iduser) => {
  const patients = await patientService.findPatientByQuery({
    user: iduser,
  });
  const idList = patients.map(({ _id }) => _id);
  return idList;
};

module.exports = {
  getNotifications,
  createNofitication,
  getNumbersUnreadedNotifications,
  markNotificationsAsReaded
};
