import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import { ApolloQueryObservable } from 'angular2-apollo';

import template from './list.component.html';
import style from './list.component.scss';



/*
Service
*/

import {
    EventService,
    UserService
} from '../../../../services/services';

@Component({
    selector: 'event-list',
    template,
    styles: [style]
})
export class EventsListComponent implements OnInit {
    eventsObs: ApolloQueryObservable<any>;
    eventsSub: Subscription;
    events: any;
    loading: boolean;
    constructor(
        private eventService: EventService,
        private userService: UserService) {

    }

    ngOnInit() {

        this.eventsObs = this.eventService.getAllEvents();
        this.eventsSub = this.eventsObs.subscribe(({data, loading}) => {
            console.log(data);
            this.events = data.events;
            this.loading = data.loading;
        });

    }
    islogin(): boolean {
        return this.userService.isLogIn();
    }
}
