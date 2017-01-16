import { MongoObservable } from 'meteor-rxjs';

import { Categorie } from '../models/categorie.model';

export const CategorieCollection = new MongoObservable.Collection<Event>('categories');
