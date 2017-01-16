import {CollectionObject} from './collection-object.model';

export interface Event extends CollectionObject{
    title: String,
    date: Date,
    categorie: String,
    location: String,
    description: String,
    picture: String,
    owner: String,
    guestids: [String],
    guests: [String],
    organisatorids: [String],
    organisators: [String],
}
