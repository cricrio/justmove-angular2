import {Component, Input, Output} from '@angular/core';
import {Meteor} from 'meteor/meteor';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';

// import * as _ from '_'
import template from './addGuestButton.component.html';
import style from './addGuestButton.component.scss';


import {UserService,EventService} from '../../../../services/services';

import {addGuestMutation} from './addGuestButton.model';

@Component({
    selector: 'event-details-add-guest-button',
    template,
    styles: [style]
})
export class EventDetailsAddGuestButtonComponent {
    @Input() @Output() event: any;
    user: any;
    loading:true;
    constructor(private eventService: EventService, private userService: UserService) {
        userService.getCurrentUser().subscribe(user => {
            this.user = user;
        });
    }
    private isComing(): boolean {
        return false;
    }
    addGuest() {

        this.eventService.addGuest(this.user);
        // console.log(this.loading);
        // console.log(this.user);
        // this.apollo.mutate({
        //     mutation: addGuestMutation,
        //     variables: {
        //         eventid: this.event._id,
        //         userid: Meteor.userId()
        //     },
        //     //optimisticResponse: optimisticAdding()
        //
        // })
        // .toPromise()
        // .then(({ data }) => {
        //     console.log('got data', data);
        // }).catch((error) => {
        //     console.log('there was an error sending the query', error);
        // });
    }

}

//helper
function optimisticAdding(): Object {
    return {
        __typename: 'Mutation',
        submitComment: {
            // __typename: 'string',
            // id: null,
            // postedBy,
            // content,
            // createdAt: +new Date,
        }
    };
}
