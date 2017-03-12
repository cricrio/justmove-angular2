import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
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
    guestListObs: ApolloQueryObservable<any>;
    guestListSub: Subscription;
    guestList: string[];
    loading: boolean;


    constructor(private eventService: EventService) { }
    ngOnInit() {
        this.guestListObs = this.eventService.getGuests();
        console.log(this.guestListObs);
        // this.guestListSub = this.guestListObs.subscribe(({ data, loading }) => {
        //     console.log(data);
        //     this.loading = loading;
        //     this.guestList = data.guestsFromEvent;
        // })
    }
}
