import { MongoObservable } from 'meteor-rxjs';

import { JmEvent } from '../models/event.model';

export const EventCollection = new MongoObservable.Collection<JmEvent>('events');
