import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';

import {User,userQuery} from '../models/user.model';

@Injectable()
export class UserService {
    private userObs = new BehaviorSubject<any>(null);

    constructor(private apollo: Angular2Apollo) {

    }
    public setCurrentUser() {
        this.apollo.watchQuery({
            query: userQuery,
            variables: { id: Meteor.userId() }
        }).subscribe(({data,loading})=>{
          this.userObs.next(data.user);
        })
    }
    public getCurrentUserObs(): Observable<any> {
        return this.userObs;
    }

    public getUser(id: string): Observable<any> {
        return this.apollo.watchQuery({
            query: userQuery,
            variables: { id }
        });
    }
    public isLogIn(): boolean{
      return !!! Meteor.userId();
    }
}
export var userServiceInjectables: Array<any> = [
    UserService
];
