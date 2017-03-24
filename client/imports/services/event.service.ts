import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

import {
    eventQuery,
    eventsListQuery,
    guestsQuery,
    addGuestMutation
} from '../models/event.model';

import {UserService} from './services';

@Injectable()
export class EventService {
    private eventSub: Subscription;
    private guestsSub: Subscription;
    private eventId: string;
    private event = new BehaviorSubject<any>(null);
    private guests = new BehaviorSubject<any[]>(null);


    constructor(
        private apollo: Apollo
    ) { }

    setCurrentEvent(eventId: string): BehaviorSubject<any> {
        this.eventId = eventId;
        this.subscribeEvent(this.eventId);
        this.subscribeGuests(this.eventId);

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

    addGuest(user: any) {
        // const user = this.userService.getCurrentUser().getValue();
        // console.log(user)
        console.log("adding guesy");
        this.apollo.mutate({
            mutation: addGuestMutation,
            variables: {
                eventid: this.eventId,
            },
            updateQueries: {
                getGuests: (previousResult, { mutationResult }) => {
                    console.log("update query");
                    const newGuest = mutationResult.data.addGuest;
                    const prevGuests = previousResult.guests;
                    if (prevGuests.length == 0) {
                      console.log("prevGuest empty");
                        return [newGuest];
                    } else {
                        return [newGuest, ...prevGuests]
                    }
                }
            },
            optimisticResponse: optimisticGuest(user),



        }).subscribe(({data, loading}) => {
            console.log(data);
            console.log(loading);
        })

    };

    private subscribeEvent(eventId: string) {
        if (this.eventSub) {
            this.eventSub.unsubscribe();
        }
        this.eventSub = this.apollo.watchQuery({
            query: eventQuery,
            variables: { id: eventId },
        }).subscribe(({data, loading}) => {
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
    console.log(user);
    return {
        __typename: 'Mutation',
        addGuest: {
            id: user._id,
            _id: user._id,
            __typename: 'User',
            name: user.name,
            picture: user.picture
        },
    }
};
