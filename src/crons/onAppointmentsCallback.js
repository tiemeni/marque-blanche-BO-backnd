const timeZone = "Africa/Douala"
const { sendCodeVerif, sendNotification } = require("../helpers");
const appointementService = require("../services/appointment.service")
const patientService = require("../services/patient.service")



sendCodeVerif("code supr", "tiemanirocket@gmail.com", {})
    // const currentTime = new Date();
    // const nextHour = new Date(currentTime.getTime() + 60 * 60 * 1000);

    // const start = formatTz(currentTime, "yyyy-MM-dd'T'HH:mm", timeZone)
    // const end = formatTz(nextHour, "yyyy-MM-dd'T'HH:mm", timeZone)
    // sendCodeVerif(`${start} ${end}`, "tiemanirocket@gmail.com", { onSuccess: () => console.log("success") })
    // const appointments = await appointementService.findByQuery({
    //     date_long: {
    //         // $gte: start,
    //         $lte: end,
    //     },
    // })

    // appointments.forEach(async (appointment) => {
    //     const patient = await patientService.findPatientById(appointment.patient._id)
    //     if (!patient) {
    //         console.error('Utilisateur non trouvé pour le rendez-vous');
    //         return;
    //     }
    //     const userExpoToken = patient?.user?.expoToken;
    //     const alreadySent = appointment?.sent;
    //     if (userExpoToken && alreadySent) {
    //         try {
    //             sendNotification(
    //                 userExpoToken,
    //                 `Votre rendez-vous avec le Dr. ${appointment.practitioner.name} commence dans une heure: ${appointment?.motif?.nom}`,
    //                 "Rappel de Rendez-vous"
    //             ).then(res => {
    //                 appointment.sent = true;
    //                 appointment.save()
    //             })
    //         } catch (error) {
    //             console.error('Erreur lors de l\'envoi de la notification:', error.message);
    //         }
    //     }
    // })
