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
export class EventUserComponent  {
    @Input() user: any;


}
