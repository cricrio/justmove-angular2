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
    private guests = new BehaviorSubject<any[]>(null);


    constructor(private apollo: Angular2Apollo) { }

    setCurrentEvent(eventId: Subject<string>): BehaviorSubject<any> {
console.log("setting")
        this.eventId = eventId;
        this.subscribeEvent(eventId);
        this.subscribeGuests(eventId);

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

    getGuests(): BehaviorSubject<any[]> {
        return this.guests;
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
    };

    private subscribeEvent(eventId: Subject<string>) {

        this.apollo.watchQuery({
            query: eventQuery,
            variables: { id: eventId }
        }).subscribe(({data, loading}) => {
            this.event.next(data.event);
        });
    };
    //helpers
    private subscribeGuests(eventId: Subject<string>) {

        this.apollo.watchQuery({
            query: guestsQuery,
            variables: { id: eventId },
            pollInterval: 5000
        }).subscribe(({data, loading}) => {
            console.log(data.guests)
            this.guests.next(data.guests);
        });
    }
}

export var eventServiceInjectables: Array<any> = [
    EventService
];

//helpers



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
