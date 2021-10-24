const Event = require('../../Models/Event');
const moment = require('moment');

module.exports = {

    Mutation: {

        async createEvent(_, { title }) {

            const event = new Event({
                start: new Date().toISOString(),
                end: new Date().toISOString(),
                title: title
            });

            await event.save();

            return event;

        }

    }

}