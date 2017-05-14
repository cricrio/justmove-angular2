import {EventCollection} from '../../collections/event.collection';

export const user = {

    events(user) {
        return EventCollection.find({owner: user._id}).fetch();
    }
}
