import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {EventDataService} from '../../event-data.service';
import {JmEvent} from '../../../../../../both/models/event.model';
import template from './list.component.html';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';

@Component({
    selector: 'event-list',
    template,
})
export class EventsListComponent implements OnInit {
    events: Observable<JmEvent[]>;
    toto: any;
    loading :any;
    constructor(private eventDataService: EventDataService, private apollo: Angular2Apollo) {

    }

    ngOnInit() {
        this.events = this.eventDataService.getData().zone();
        this.apollo.watchQuery({
            query: gql`query {
    events{
      _id
      title
      picture
      date
      categorie
      location
      owner{
        name
        picture
      }
    }
  }`
        }).subscribe(({data}) => {
            this.loading = data.loading;
            this.toto = data;
            console.log(data.events);
        });


        // by default, this client will send queries to `/graphql` (relative to the URL of your app)

        console.log(this.events);
    }
}
