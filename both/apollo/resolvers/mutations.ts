import {EventCollection} from '../../collections/event.collection';

export const mutations = {
    addGuest(root, args, context) {
      console.log("adding guest to" + args.eventId);
        EventCollection.update({_id : args.eventId}, {
            $addToSet: {
                guestids: args.userId
            }
        });
        console.log(EventCollection.findOne({ _id: args.eventId }));
        return EventCollection.findOne({ _id: args.eventId });
    }
}
