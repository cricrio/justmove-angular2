import {EventCollection} from '../../collections/event.collection';

export const mutations = {
    addGuest(root, args, context) {
        EventCollection.update(args.eventId, {
            $addToSet: {
                guestids: args.userId
            }
        });
        return EventCollection.findOne({ _id: args.eventId });
    }
}
