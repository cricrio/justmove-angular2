import {EventCollection} from '../../collections/event.collection';
import {getUser} from './methods';

export const mutations = {
    addGuest(root, args, context) {
        console.log("mtutatu");
        console.log(context.userId);
        console.log("adding guest to" + args.eventId);
        EventCollection.update({ _id: args.eventId }, {
            $addToSet: {
                guestids: context.userId
            }
        });
        return getUser(context.userId);
    }
}
