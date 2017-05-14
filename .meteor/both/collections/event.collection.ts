import { MongoObservable } from 'meteor-rxjs';

import { JmEvent } from '../models/event.model';

export const EventCollection = new MongoObservable.Collection<JmEvent>('events');

function loggedIn() {
  return !!Meteor.user();
}

EventCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
