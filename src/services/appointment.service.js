const Appointment = require("../database/models/appointment.model")

module.exports = {
    createAppointment: async (data) => {
        let appointement = new Appointment(data)
        return await appointement.save()
    },
    findAndGroup: async () => {
        return await Appointment.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    events: { $push: '$$ROOT' }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
    },
    findOneByQuery: async (query) => {
        return await Appointment.findOne(query)
    },
    findByQuery: async (query) => {
        return await Appointment
            .find(query)
            .select("-patient")
            .select("-center")
            .populate({
                path: "motif",
                select: "-active"
            })
            .populate({
                path: "patient",
                select: "-rights -active -password -civility"
            })
            .populate({
                path: "practitioner",
                populate: {
                    path: "civility",
                    model: "Civilities"
                }
            })
    },
    findAll: async () => {
        return await Appointment.find({})
    },
    deleteAll: async () => {
        return await Appointment.deleteMany({})
    }
}