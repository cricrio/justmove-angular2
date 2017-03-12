import {EventCollection} from '../../collections/event.collection';
import {getUserListFromUserIds} from './methods';

export const event = {
    owner(event) {
        const user = Meteor.users.findOne({_id: event.owner});

        return {_id: event.owner, name: user.profile.name, picture: user.profile.picture}
    },
    guests(event) {
      console.log(`guests called ${JSON.stringify(getUserListFromUserIds(event.guestids),null,2)}`)
        return getUserListFromUserIds(event.guestids);
    },
    organisators(event) {
        return getUserListFromUserIds(event.organisatorids);
    }
}
