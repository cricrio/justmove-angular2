import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../../../both/models/message.model';
import {Subscription} from 'rxjs/Subscription';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import template from './detailsMessage.component.html';
import style from './detailsMessage.component.scss';

@Component({
    selector: 'event-details-message',
    template,
    styles: [style]
})
export class EventDetailsMessageComponent implements OnInit{
    @Input() message: Message;
    private UserFeed = gql`query getUser($id: String){
      user(id : $id){
      _id
      name
      picture
  }
}`;
    public user: any;
    public loading: boolean;
    private userSub: Subscription;
    private userObs: ApolloQueryObservable<any>;


    constructor(private apollo: Apollo) {

    }
    ngOnInit() {
        this.userObs = this.apollo.watchQuery({
            query: this.UserFeed,
            variables: { id: this.message.owner }
        });
        this.userSub = this.userObs.subscribe(({data, loading}) => {
            this.user = data.user;
            this.loading = loading;
        })
    }
}
