import {EventCollection} from '../../collections/event.collection';
import {getUser} from './methods';

export const mutations = {

    addEvent(root,args,context){
      console.log("adding event");
      const move = args.event;
      EventCollection.insert(move);
      return move;
    },
    // updateEvent(root,args,context){
    //     if(args.event.owner === context.userId){
    //         EventCollection.update({_id : args.event._id},{

    //         });
    //     }
    // },
    addGuest(root, args, context) {
        EventCollection.update({ _id: args.eventId }, {
            $addToSet: {
                guestids: context.userId
            }
        });
        return getUser(context.userId);
    },
    removeGuest(root, args, context) {
        EventCollection.update({ _id: args.eventId }, {
            $pull: {
                guestids: context.userId
            }
        });
        return getUser(context.userId);
    }
}
