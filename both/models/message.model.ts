import {CollectionObject} from './collection-object.model';

export interface Message extends CollectionObject {
    eventid: string
    owner: string,
    text: string,
    date: Date;

}
