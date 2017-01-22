import {EventCollection} from '../../collections/event.collection';

export const queries = {
        eventbyid(root, args, context) {

            const event = EventCollection.findOne({_id: args.id});
            if (event) {
                return event;
            } else {
                throw new Error("404, event not found");
            }
        },
        events(root, args, context) {
          console.log("eventsss");
            return EventCollection.find({}).fetch();

        },
        userbyid(root, args, context) {
            const user = Meteor.users.findOne({_id: args.id});
            if (user) {
                return user;
            } else {
                throw new Error("404, user not found");
            }
        }
    }
