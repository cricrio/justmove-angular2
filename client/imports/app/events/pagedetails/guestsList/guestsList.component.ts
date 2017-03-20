import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

import {EventService} from '../../../../services/services';

import template from './guestsList.component.html';
import style from './guestsList.component.scss';

@Component({
    selector: 'event-details-guests-list',
    template,
    styles: [style]
})
export class EventDetailsGuestsListComponent implements OnInit {
    @Input() event: any;
    guestListObs: BehaviorSubject<any[]>;
    guestListSub: Subscription;
    guests: any[];
    loading: boolean;


    constructor(private eventService: EventService) { }
    ngOnInit() {
        this.guestListObs = this.eventService.getGuests();
        console.log(this.guestListObs);
        this.guestListSub = this.guestListObs.subscribe(guests => {
            console.log("subscribe");
            console.log(guests);
            this.guests = guests;
        })
    }
}
