import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';

@Injectable()
export class EventService{

  setCurrentEvent(id: string){}
  getCurrentEvent(){}
  getEvent(id: string){}
  getEvents(){}
  getGuests(id: string){}
  getOrganisators(id: string){}
}

export var eventServiceInjectables: Array<any> = [
    EventService
];
