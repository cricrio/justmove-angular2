import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {EventDataService} from '../../event-data.service';
import {JmEvent} from '../../../../../../both/models/event.model';
import template from './list.component.html';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';

@Component({
    selector: 'event-list',
    template,
})
export class EventsListComponent implements OnInit {
    events: Observable<any>;

    EventFeed = gql`query {
events{
_id
title
picture
date
categorie
location
}
}`;
    constructor(private apollo: Angular2Apollo) {

    }

    ngOnInit() {

        this.events = this.apollo.watchQuery({ query: this.EventFeed, pollInterval: 10000 })
            .map(({data}) => data.events);


        // by default, this client will send queries to `/graphql` (relative to the URL of your app)

        console.log(this.events);
    }
}
