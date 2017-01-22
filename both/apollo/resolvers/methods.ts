// import {check} from 'meteor/check';

export function getUserListFromUserIds(list : []) {
    // check(list, Array);
    console.log(list);
    let people = []
    list.forEach((id) => {
        const user = Meteor.users.findOne({_id: id});
        people.push({_id: user._id, name: user.profile.name, picture: user.profile.picture});
    });
    return people;
}
