import { Meteor } from 'meteor/meteor';

export function getUsersFromIds(list: any[]) {
    // check(list, Array);
    console.log(list);
    if (!list || list == []) { return []; }
    let people = []
    list.forEach((id) => {
        const user = getUser(id);
        people.push(user);
    });
    return people;
}
export function getUser(id: string): any {
    const user = Meteor.users.findOne({ _id: id });
    if (user) {
        return { _id: user._id, name: user.profile.name, picture: user.profile.picture };
    } else return [];

}
