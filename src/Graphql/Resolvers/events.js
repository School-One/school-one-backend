const Event = require('../../Models/Event');
const moment = require('moment');

module.exports = {

    Query: {

        async getEvents(_, { start, end }) {

            const event = await Event.find({
                start: { $gte: moment(start).toDate() },
                end: { $lte: moment(end).toDate() },
            });

            return event;

        }

    },

    Mutation: {

        async createEvent(_, { title, start, end }) {

            const event = new Event({
                start: moment(new Date()).toDate(),
                end: moment(new Date()).toDate(),
                title: title
            });

            await event.save();

            return event;

        }

    }

}