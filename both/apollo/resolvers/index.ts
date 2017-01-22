import {date} from './date';
import {event} from './event';
import {user} from './user';
import {queries} from './queries';

export const resolvers = {
    Query: queries,
    User: user,
    Event: event,
    Date: date
}
