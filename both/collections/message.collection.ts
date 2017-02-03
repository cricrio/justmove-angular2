import { MongoObservable } from 'meteor-rxjs';

import { Message } from '../models/message.model';

export const MessageCollection = new MongoObservable.Collection<Message>('messages');

function loggedIn() {
  return !!Meteor.user();
}

MessageCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
