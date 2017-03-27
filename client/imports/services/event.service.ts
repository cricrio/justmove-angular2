import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

import {
    eventQuery,
    eventsListQuery,
    guestsQuery,
    removeGuestMutation,
    addGuestMutation
} from '../models/event.model';

import {UserService} from './services';

@Injectable()
export class EventService {
    private counter = 0;
    private eventId: string;
    private eventSub: Subscription;
    private guestsSub: Subscription;
    private isComingBeSub = new BehaviorSubject<boolean>(false);
    private event = new BehaviorSubject<any>(null);
    private guests = new BehaviorSubject<any[]>(null);


    constructor(
        private apollo: Apollo
    ) { }

    setCurrentEvent(eventId: string): BehaviorSubject<any> {
        this.eventId = eventId;
        this.subscribeEvent(this.eventId);
        //this.subscribeGuests(this.eventId);

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


    isComing(): Observable<boolean> {
        return this.isComingBeSub;
    }
    addGuest(user: any) {

        this.isComingBeSub.next(!this.isComingBeSub.getValue());

        this.apollo.mutate({
            mutation: addGuestMutation,
            variables: {
                eventid: this.eventId,
            },
            updateQueries: {
                getEvent: (prev, { mutationResult }) => {
                    if (!mutationResult.data) { return prev; }
                    const newGuest = mutationResult.data.addGuest;
                    const prevGuests = prev.event.guests;
                    return {
                        event: Object.assign(prev.event, { guests: [newGuest, ...prevGuests] })
                    };


                }

            },
            optimisticResponse: optimisticGuest(user),
        }).subscribe(({data, loading}) => {
            console.log(loading);
        })

    };
    removeGuest(user: any) {

        this.isComingBeSub.next(!this.isComingBeSub.getValue());

        this.apollo.mutate({
            mutation: removeGuestMutation,
            variables: {
                eventid: this.eventId,
            },
            updateQueries: {
                getEvent: (prev, { mutationResult }) => {
                    if (!mutationResult.data) { return prev; }
                    const newGuest = mutationResult.data.addGuest;
                    const prevGuests = prev.event.guests;
                    return {
                        event: Object.assign(prev.event,
                            { guests: prev.event.guests.filter(user => user._id != Meteor.userId()) }
                        )
                    };

                }

            },
            optimisticResponse: optimisticGuest(user),
        }).subscribe(({data, loading}) => {
            console.log(loading);
        })

    };

    private subscribeEvent(eventId: string) {
        if (this.eventSub) {
            this.eventSub.unsubscribe();
        }
        this.apollo.watchQuery({
            query: eventQuery,
            variables: { id: eventId },
            pollInterval: 10000
        }).subscribe(({data, loading}) => {
            const isComing = data.event.guests.filter(user => user._id === Meteor.userId());
            this.isComingBeSub.next(isComing.length != 0);
            this.event.next(data.event);
        });
    };
    //helpers
    private subscribeGuests(eventId: string) {
        if (this.guestsSub) {
            this.guestsSub.unsubscribe();
        }
        this.guestsSub = this.apollo.watchQuery({
            query: guestsQuery,
            variables: { id: eventId },
            pollInterval: 5000
        }).subscribe(({data, loading}) => {
            this.guests.next(data.guests);
        });
    }
}

export var eventServiceInjectables: Array<any> = [
    EventService
];

//helpers

function optimisticGuest(user: any): Object {
    return {
        __typename: 'Mutation',
        addGuest: {
            id: user._id,
            __typename: 'User',
            name: user.name,
            picture: user.picture
        },
    }
};
