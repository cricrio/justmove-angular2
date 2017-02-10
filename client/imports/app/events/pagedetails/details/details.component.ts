import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';
import template from './details.component.html';
import style from './details.component.scss';

@Component({
    selector: 'event-details',
    template,
    styles: [style]
})
export class EventDetailsComponent implements OnInit, OnDestroy {
    private eventId: string;

    private OrganisatorsQuery = gql`query getOrganisators($id : String){
      guestsFromEvent(id : $id){
      name
      picture
    }
}`;

    private EventQuery = gql`query getEvent($id: String){
    event(id : $id){
      _id
      title
      owner{
        name
        picture
      }
      picture
      date
      description
      location
    }
  }`;

    public event: any;
    public loading: boolean;
    private eventSub: Subscription;
    private eventObs: ApolloQueryObservable<any>;


    constructor(
        private route: ActivatedRoute,
        private apollo: Angular2Apollo
    ) { }
    ngOnInit() {
        this.route.params
            .map(params => params['eventId'])
            .subscribe(eventId => {
                this.eventId = eventId;
                this.eventObs = this.apollo.watchQuery({
                    query: this.EventQuery,
                    variables: { id: this.eventId }
                });
                this.eventSub = this.eventObs.subscribe(({ data, loading }) => {
                    this.event = data.event;
                    console.log(this.event);
                    this.loading = loading;

                });
            })
    }
    ngOnDestroy() {
        this.eventSub.unsubscribe();
    }
}
