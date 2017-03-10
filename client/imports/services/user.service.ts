import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';

import {User} from '../models/user.model';

@Injectable()
export class UserService {
    private userObs: ApolloQueryObservable<any>;
    private UserFeed = gql`query getUser($id: String){
  user(id : $id){
  _id
  name
  picture
}
}`;
    constructor(private apollo: Angular2Apollo) {

    }
    public setCurrentUser() {
        this.userObs = this.apollo.watchQuery({
            query: this.UserFeed,
            variables: { id: Meteor.userId() }
        });
    }
    public getCurrentUserObs(): Observable<any> {
        return this.userObs;
    }

    public getUser(id: string): Observable<any> {
        return this.apollo.watchQuery({
            query: this.UserFeed,
            variables: { id }
        });
    }
}
export var userServiceInjectables: Array<any> = [
    UserService
];
