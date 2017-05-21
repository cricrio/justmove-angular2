import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

import {
    eventQuery,
    eventsListQuery,
    guestsQuery,
    removeGuestMutation,
    addEventMutation,
    addGuestMutation,
    updateEventMutation
} from '../queries/event.query';

import { UserService } from './services';

@Injectable()
export class EventService {

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
    getCurrentEventValue(): any {
        return this.event.getValue();
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

    isComing(): Observable<boolean> {
        return this.isComingBeSub;
    }

    addEvent(move: any) {
        this.apollo.mutate(
            {
                mutation: addEventMutation,
                variables: {
                    event: move
                }
            }
        ).subscribe(({ data, loading }) => {
            console.log(data);
            console.log(loading);
        });
    }
    updateEvent(eventId: string, modifiedEvent) {
        const diff = this.getEventDiff(modifiedEvent,this.event.getValue());
        if(Object.keys(diff).length === 0){
            console.log("aucune modification");
        }else{
            console.log("Différence ! ")
            console.log(diff);
            this.apollo.mutate(
            {
                mutation: updateEventMutation,
                variables: {
                    event: diff
                }
            }
        ).subscribe(({ data, loading }) => {
            console.log(data);
            console.log(loading);
        });
        }
    }
    private getEventDiff(modified, original) {
        delete modified.organisatorids; //pour ne pas le prendre compte dans les diff
        const keys = Object.keys(modified);
        const diff = keys.reduce((doff, key) => {
            if (original[key] !== modified[key] && key !== "__proto__" ) {
                doff[key] = modified[key];
            }
            return doff;
        }, {});
        return diff;
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
        }).subscribe(({ data, loading }) => {
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
        }).subscribe(({ data, loading }) => {
            console.log(loading);
        })

    };

    isEventOfUser(): boolean {
        return Meteor.userId() === this.event.getValue().owner._id;
    }

    private subscribeEvent(eventId: string) {
        if (this.eventSub) {
            this.eventSub.unsubscribe();
        }

        this.eventSub = this.apollo.watchQuery({
            query: eventQuery,
            variables: { id: eventId },
            pollInterval: 10000
        }).subscribe(({ data, loading }) => {
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
        }).subscribe(({ data, loading }) => {
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
            _id: user._id,
            __typename: 'User',
            name: user.name,
            picture: user.picture
        },
    }
};
