const Appointment = require("../database/models/appointment.model");
const Notifications = require("../database/models/notification.model");

module.exports = {
  create: async (data) => {
    let notification = new Notifications(data);
    return notification.save();
  },
  getByQuery: async (query) => {
    return await Notifications.find(query).sort({ created_at: -1 });
  },
  updateNotifications: async (filter, query) => {
    return await Notifications.updateMany(filter, query);
  },
};
