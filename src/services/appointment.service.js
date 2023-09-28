const Appointment = require("../database/models/appointment.model");

module.exports = {
  createAppointment: async (data) => {
    let appointment = new Appointment(data);
    await appointment.save();

    return await appointment.populate("practitioner");
  },
  findAndGroup: async () => {
    return await Appointment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          events: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  },
  findOneByQuery: async (query) => {
    return await Appointment.findOne(query);
  },
  findByQuery: async (query) => {
    return await Appointment.find(query)
      .select("-patient")
      .populate({
        path: "motif",
        select: "-active -default_time",
      })
      .populate({
        path: "patient",
        select: "-rights -active -password -civility",
      })
      .populate("center")
      .populate("lieu")
      .populate({
        path: "practitioner",
        populate: [
          {
            path: "civility",
            model: "Civilities",
            select: "-password",
          },
          {
            path: "job",
            model: "Specialite",
            select: "title",
          },
        ],
      })
      .sort({ date_long: 1 });
  },
  findAll: async (query) => {
    return await Appointment.find(query);
  },
  deleteAll: async () => {
    return await Appointment.deleteMany({});
  },
  editeOneByQuery: async (id, idc, query) => {
    return await Appointment.findOneAndUpdate({ _id: id }, query, { new: true })
      .populate({
        path: "patient",
      })
      .populate({
        path: "motif",
        select: "-default_time",
      })
      .populate({
        path: "practitioner",
        populate: [
          {
            path: "civility",
            model: "Civilities",
            select: "-password",
          },
          {
            path: "job",
            model: "Specialite",
            select: "title",
          },
        ],
      });
  },
  findAndDelete: async (id, query) => {
    return await Appointment.findByIdAndDelete(id, query);
  },
};
