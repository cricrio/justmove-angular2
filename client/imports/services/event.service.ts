import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';

import {
    eventQuery,
    eventsListQuery,
    guestsQuery,
    addGuestMutation
} from '../models/event.model';

@Injectable()
export class EventService {
    private eventId: Subject<string>;
    private event = new BehaviorSubject<any>(null);
    private eventObs: ApolloQueryObservable<any>;
    private guestsObs: ApolloQueryObservable<any>;

    constructor(private apollo: Angular2Apollo) { }

    setCurrentEvent(eventId: Subject<string>): BehaviorSubject<any> {
        this.eventId = eventId;
        subscribeEvent(eventId);
        this.apollo.watchQuery({
            query: guestsQuery,
            variables: { id: eventId },
            pollInterval: 5000
        })

        return this.event;
    }


    getCurrentEvent(): BehaviorSubject<any> {
        return this.event;
    }

    getAllEvents(): ApolloQueryObservable<any> {
        return this.apollo.watchQuery({
            query: eventsListQuery,
            pollInterval: 5000
        });
    }

    getGuests() {
        return this.guestsObs;
    }

    getOrganisators(id: string) {
        //TO-DO
    }

    addGuest() {
        this.apollo.mutate({
            mutation: addGuestMutation,
            variables: {
                eventid: this.eventId,
                userid: Meteor.userId()
            },
            optimisticResponse: optimisticAdding()

        });
    }


}

export var eventServiceInjectables: Array<any> = [
    EventService
];

//helpers
function subscribeEvent(eventId: Subject<string>){

   this.apollo.watchQuery({
       query: eventQuery,
       variables: { id: eventId }
   }).subscribe(({data, loading}) => {
       this.event.next(data.event);
   });
}

function optimisticAdding(): Object {
    return {
        // __typename: 'Mutation',
        // submitComment: {
        //     __typename: 'string',
        //     id: null,
        //     postedBy,
        //     content,
        //     createdAt: +new Date,
        //}
    };
}
