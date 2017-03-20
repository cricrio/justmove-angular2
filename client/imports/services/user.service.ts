import {Meteor} from 'meteor/meteor';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

import {User,userQuery} from '../models/user.model';

@Injectable()
export class UserService {
    private user = new BehaviorSubject<any>(null);

    constructor(private apollo: Apollo) {

    }
    public setCurrentUser() {
        this.apollo.watchQuery({
            query: userQuery,
            variables: { id: Meteor.userId() }
        }).subscribe(({data,loading})=>{
          this.user.next(data.user);
        })
    }
    public getCurrentUser(): BehaviorSubject<any> {
        return this.user;
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
