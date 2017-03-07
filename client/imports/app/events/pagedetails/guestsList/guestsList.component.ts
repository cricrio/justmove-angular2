import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';

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
    GuestsQuery = gql`query getGuests($id : String){
    guestsFromEvent(id : $id)
  }`;
    guestList: string[];
    loading: boolean;

    constructor(private apollo: Angular2Apollo) { }
    ngOnInit() {
        this.guestListObs = this.apollo.watchQuery({
            query: this.GuestsQuery,
            variables: {
                id: this.event._id
            }
        });
        this.guestListSub = this.guestListObs.subscribe(({ data, loading }) => {
            this.loading = loading;
            this.guestList = data.guestsFromEvent;
        })
    }
}
