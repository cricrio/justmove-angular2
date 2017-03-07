import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';

import template from './user.component.html';
import style from './user.component.scss';

@Component({
    selector: 'event-user',
    template,
    styles: [style]
})
export class EventUserComponent implements OnInit {
    @Input() userid: string;
    public user : any;
    private UserFeed = gql`query getUser($id: String){
    user(id : $id){
    _id
    name
    picture
}
}`;
    public loading: boolean;
    private userSub: Subscription;
    private userObs: ApolloQueryObservable<any>;


    constructor(private apollo: Angular2Apollo) { }
    ngOnInit() {
      this.userObs = this.apollo.watchQuery({
          query: this.UserFeed,
          variables: { id: this.userid }
      });
      this.userSub = this.userObs.subscribe(({data, loading}) => {
          this.user = data.user;
          this.loading = loading;
      })
    }
}
