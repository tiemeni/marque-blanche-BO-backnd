const dns = require('dns')

module.exports.startServer = async ({ connectDB, server, startServer, PORT }) => {
    console.clear();
    //---this is just for developpment purpose
    return dns.resolve("www.google.com", (err) => {
        if (err) {
            console.log('you are not connected');
            return null;
        } else {
            console.log("setting up the server ...")
            connectDB()
                .then(() => {
                    server.listen(PORT, () => {
                        console.clear()
                        console.log(`started on Port ${PORT} !`)
                    });
                })
                .catch(e => {
                    console.log('storage service error : ' + e);
                    startServer()
                })
        }
    })
}


function convertTime(time) {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date;
}

// Algorithm to calculate availability within a given time range
module.exports.calculateAvailability = (practitioner, appointments) => {
    const rangeEnd = convertTime(practitioner.endTime);

    appointments.sort((a, b) => a.start - b.start); // Sort appointments in ascending order of start time
    const availabilities = [];

    let currentTime = convertTime(practitioner.startTime);
    for (const appointment of appointments) {
        const appointmentStart = convertTime(appointment.start)
        if (appointmentStart > currentTime) {
            const differenceInMinutes = (appointmentStart - currentTime) / (1000 * 60);
            if (differenceInMinutes >= practitioner.minInterval) {
                const reste = Math.floor(differenceInMinutes / practitioner.minInterval)

                for (let index = 0; index < reste; index++) {
                    const availableTime = new Date(currentTime.getTime() + practitioner.minInterval * 60 * 1000 * index);
                    if (availableTime < rangeEnd) {
                        availabilities.push(availableTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
                    }
                }
            }
        }
        currentTime = convertTime(appointment.end);
    }

    // Add availabilities until the end of the time range
    while (currentTime < rangeEnd) {
        currentTime = new Date(currentTime.getTime() + practitioner.minInterval * 60 * 1000);
        if (currentTime <= rangeEnd) {
            availabilities.push(currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
    }

    return availabilities;
}

module.exports.formatDate = (date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const day = days[date.getDay()];
    const dayNumber = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${dayNumber} ${month} ${year}`;
};