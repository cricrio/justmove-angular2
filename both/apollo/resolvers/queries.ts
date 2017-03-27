import {EventCollection} from '../../collections/event.collection';

import {getUsersFromIds} from './methods';
export const queries = {
    event(root, args, context) {
        const event = EventCollection.findOne({ _id: args.id });
        if (event) {
            return event;
        } else {
            throw new Error("404, event not found");
        }
    },
    events(root, args, context) {

        return EventCollection.find({}).fetch();

    },
    guests(root, args, context) {
        const event = EventCollection.findOne({ _id: args.id });
        if (event) {
            return getUsersFromIds(event.guestids);
        } else {
            throw new Error("404, event not found");
        }
    },
    organisators(root, args, context) {
        const event = EventCollection.findOne({ _id: args.id });
        if (event) {
            return getUsersFromIds(event.organisators);
        } else {
            throw new Error("404, event not found");
        }
    },
    user(root, args, context) {
        const user = Meteor.users.findOne({ _id: args.id });
        if (user) {
            return {
                _id: user._id,
                name: user.profile.name,
                picture: user.profile.picture
            };
        } else {
            throw new Error("404, user not found");
        }
    }
}
