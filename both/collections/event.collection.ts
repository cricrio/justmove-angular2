import { MongoObservable } from 'meteor-rxjs';

import { Event } from '../models/event.model';

export const EventCollection = new MongoObservable.Collection<Event>('events');
