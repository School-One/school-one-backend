const Reminder = require('../../Models/Reminders');

module.exports = {

    Query: {

        async getReminders(_, { studentId }) {

            try {
                const reminders = await Reminder.find({'students._id' : studentId}).sort({ startDate: -1 }).limit(5);
                if(reminders) return reminders;
            } catch (err) {
                throw new Error(err);
            }

        }

    }

}