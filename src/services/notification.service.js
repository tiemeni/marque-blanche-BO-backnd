const Appointment = require("../database/models/appointment.model");
const Notifications = require("../database/models/notification.model");

module.exports = {
    create: async (data) => {
        let notification = new Notifications(data)
        return notification.save()
    },
    getByQuery: async (query) => {
        return await Notifications.find(query)
    }
}