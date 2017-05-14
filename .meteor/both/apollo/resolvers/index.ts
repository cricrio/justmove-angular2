import {date} from './date';
import {event} from './event';
import {user} from './user';
import {mutations} from './mutations';
import {queries} from './queries';

export const resolvers = {
    Query: queries,
    Mutation: mutations,
    User: user,
    Event: event,
    Date: date
}
