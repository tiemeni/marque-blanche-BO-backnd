const axios = require("axios");
const { env } = require("../config/env/variables");
const ejs = require("ejs");
const { parse, formatISO, format } = require("date-fns");
const dns = require("dns");
const fr = require("date-fns/locale/fr");
const nodemailer = require("nodemailer");
const { utcToZonedTime } = require("date-fns-tz");
const formatTz = require("date-fns-tz/format");
const colorNames = require("color-names");

const timeZone = "Africa/Douala";

module.exports.startServer = async ({
  connectDB,
  server,
  startServer,
  PORT,
}) => {
  console.clear();
  //---this is just for developpment purpose
  return dns.resolve("www.google.com", (err) => {
    if (err) {
      console.log("you are not connected");
      return null;
    } else {
      console.log("setting up the server ...");
      connectDB()
        .then(() => {
          server.listen(PORT, () => {
            console.clear();
            console.log(`started on Port ${PORT} !`);
          });
        })
        .catch((e) => {
          console.log("storage service error : " + e);
          startServer();
        });
    }
  });
};

function convertTime(time) {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  date.setSeconds(parseInt(0));
  return formatUtc(date);
}

const formatDateISO = (date, template = "EEEE dd MMMM yyyy") => {
  return format(date, template, { locale: fr });
};

const formatUtc = (date) => utcToZonedTime(date, timeZone);

const formatResult = (key, data, availableTime) => {
  const start = formatTz(formatUtc(availableTime), "HH:mm");
  let parsedDate = parse(key, "yyyy-MM-dd", new Date());

  const [hours, minutes] = start.split(":").map(Number);
  parsedDate.setHours(hours);
  parsedDate.setMinutes(minutes);

  return {
    pname: data.name,
    psurname: data.surname,
    displayedDate: formatDateISO(formatUtc(key)) + " à " + start,
    date_aff: formatDateISO(formatUtc(key), "dd/MM/yyyy"),
    date: key,
    date_long: formatDateISO(parsedDate, "yyyy-MM-dd'T'HH:mm"),
    start: start,
  };
};

// Fonction pour obtenir tous les jours entre deux dates
const getDaysBetweenDates = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  const daysBetween = [];

  // Boucle pour générer les dates intermédiaires
  let currentDate = startDateObj;
  while (currentDate <= endDateObj) {
    daysBetween.push(currentDate.toISOString().slice(0, 10));
    currentDate = new Date(currentDate.getTime() + oneDay);
  }

  return daysBetween;
};

// Algorithm to calculate availability within a given time range
module.exports.calculateAvailability = (
  practitioner,
  appointments,
  querySlot
) => {
  const startTime = querySlot
    ? querySlot.start
    : practitioner.startTime || "08:00";
  const endTime = querySlot ? querySlot.end : practitioner.endTime ?? "18:00";
  const rangeEnd = convertTime(endTime);

  const keys = Object.keys(appointments);
  const availabilities = [];

  for (let key of keys) {
    const rdvs = appointments[key];
    let currentTime = convertTime(startTime);

    for (const appointment of rdvs) {
      const appointmentStart = convertTime(appointment.startTime);
      if (appointmentStart > currentTime) {
        const differenceInMinutes =
          (appointmentStart - currentTime) / (1000 * 60);
        if (differenceInMinutes >= practitioner.timeSlot) {
          const reste = Math.floor(differenceInMinutes / practitioner.timeSlot);

          for (let index = 0; index < reste; index++) {
            const availableTime = new Date(
              currentTime.getTime() + practitioner.timeSlot * 60 * 1000 * index
            );
            if (availableTime < rangeEnd) {
              availabilities.push(
                formatResult(key, practitioner, availableTime)
              );
            }
          }
        }
      }
      currentTime = convertTime(appointment.endTime);
    }
    // Add availabilities until the end of the time range
    while (currentTime < rangeEnd) {
      const isEqual = currentTime.getTime() == convertTime(startTime).getTime();
      if (isEqual) {
        availabilities.push(
          formatResult(key, practitioner, new Date(currentTime.getTime()))
        );
      }

      currentTime = new Date(
        currentTime.getTime() + practitioner.timeSlot * 60 * 1000
      );
      if (currentTime <= rangeEnd) {
        availabilities.push(formatResult(key, practitioner, currentTime));
      }
    }
  }

  const filtered = removeTodayExpiredDispo(availabilities);

  return filtered;
};

const removeTodayExpiredDispo = (availabilities) => {
  const today = formatUtc(new Date());

  return availabilities.filter((availability) => {
    return formatUtc(availability.date_long) > today;
  });
};

module.exports.formatDate = (date) => {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const day = days[date.getDay()];
  const dayNumber = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${dayNumber} ${month} ${year}`;
};

const getLastDayOfInterval = (date) => {
  const d = date ? new Date(date) : new Date();
  const dayOfWeek = d.getDay();
  let daysLeft = 0;

  if (dayOfWeek < 5) daysLeft = 6 - (dayOfWeek + (4 - dayOfWeek));
  if (dayOfWeek === 5) daysLeft = dayOfWeek + 1;
  if (dayOfWeek === 6) daysLeft = dayOfWeek;

  const lastDay = new Date(d.getTime());
  lastDay.setDate(d.getDate() + daysLeft);

  lastDay.setHours(23);
  lastDay.setMinutes(59);
  lastDay.setSeconds(59);

  return lastDay;
};

module.exports.replaceIfEmpty = (data, dates) => {
  const keys = Object.keys(data);
  if (keys.length < 3) {
    const days = !Array.isArray(dates)
      ? getDaysBetweenDates(dates.start, dates.end)
      : dates;
    days.forEach((day) => {
      if (!data[day]) {
        data[day] = [];
      }
    });
  }
  return data;
};

const getNextWeekdaysFromDate = (dateToday, targetDay) => {
  if (targetDay === -1 || targetDay > 6) {
    throw new Error(
      "Jour de la semaine invalide. Veuillez saisir un jour valide en français (ex: 'lundi', 'mardi', 'samedi', etc.)."
    );
  }

  const nextWeekdays = [];
  let daysUntilNextTargetDay = (targetDay - dateToday.getDay() + 7) % 7;

  for (let i = 0; i < 3; i++) {
    const nextTargetDay = new Date(dateToday);
    nextTargetDay.setDate(dateToday.getDate() + daysUntilNextTargetDay);
    nextWeekdays.push(nextTargetDay.toISOString().slice(0, 10));
    daysUntilNextTargetDay += 7;
  }

  return nextWeekdays;
};

module.exports.formatQuery = (req) => {
  let startDate = formatUtc(new Date());
  let query = { center: req.idCentre };
  let endOfInterval = null;
  let daysTab = null;
  let slot = null;

  if (req.query.startDate) {
    startDate = formatUtc(new Date(req.query.startDate));
    query["date"] = { ...(query["date"] || {}), $gte: startDate };
  } else {
    startDate.setHours(1, 0, 0, 0);
    query["date"] = { ...(query["date"] || {}), $gte: startDate };
  }

  if (req.query.day) {
    const dayOfWeek = req.query.day;
    if (dayOfWeek >= 0 && dayOfWeek <= 6) {
      const nextDays = getNextWeekdaysFromDate(startDate, dayOfWeek);
      query["dayOfWeek"] = req.query.day;
      query["date"] = { ...(query["date"] || {}), $in: nextDays };
      daysTab = nextDays;
    }
  } else {
    endOfInterval = getLastDayOfInterval(req.query.startDate);
    query["date"] = { ...(query["date"] || {}), $lte: endOfInterval };
  }

  if (req.query.idp) query["practitioner"] = req.query.idp;

  if (req.query.slotRange) {
    const range = req.query.slotRange.split("-");
    query["startTime"] = { $gte: range[0], $lte: range[1] };
    slot = { start: range[0], end: range[1] };
  }

  return {
    query: query,
    startDate: startDate,
    endOfInterval: endOfInterval,
    daysTab: daysTab,
    querySlot: slot,
  };
};

module.exports.generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

module.exports.sendCodeVerif = (code, mail, callbacks) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tiemanirocket@gmail.com",
      pass: "nvpwfjnwfdqxcrly",
    },
  });

  ejs.renderFile(
    __dirname + "/../../public/mailTemplate.ejs",
    {
      code,
    },
    (err, data_) => {
      if (err) {
        console.log(err);
      } else {
        let mainOption = {
          from: "tiemanirocket@gmail.com",
          to: mail,
          subject: "CODE DE VERIFICATION",
          html: data_,
        };
        transporter.sendMail(mainOption, (err, _data__) => {
          if (err) {
            callbacks?.onError(err);
          } else {
            callbacks?.onSuccess();
          }
        });
      }
    }
  );
};

module.exports.sendNotification = (token, body, title, subtitle) => {
  const bodyReq = {
    to: token,
    notification: {
      body: body,
      title: title,
      subtitle: subtitle,
    },
  };
  return new Promise((a, r) => {
    return axios
      .post(env.GOOGLE_NOTIFICATION_APIS_URL, bodyReq, {
        headers: {
          "Content-Type": "application/json",
          Authorization: env.AUTHORIZATION,
        },
      })
      .then((res) => {
        a(res?.data);
      })
      .catch((err) => {
        r(err);
      });
  });
};

module.exports.getContrastColor = (hexColor) => {
  // Si la couleur est un nom (ex: 'green'), convertir en code hexadécimal
  const hex = hexColor.startsWith('#') ? hexColor : colorNameToHex(hexColor);

  // Extraire les composants RVB
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  // Calculer la luminosité selon la formule W3C
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Retourner le texte blanc pour les couleurs sombres et noir pour les couleurs claires
  return luminance > 0.5 ? "black" : "white";
};

// Fonction pour convertir le nom de couleur en code hexadécimal
function colorNameToHex(color) {
  return colorNames[color.toLowerCase()] ?? "#3788d8"
}