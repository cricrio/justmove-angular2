import {Component, Input, Output} from '@angular/core';
import {Meteor} from 'meteor/meteor';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';

import template from './addGuestButton.component.html';
import style from './addGuestButton.component.scss';


import {UserService, EventService} from '../../../../services/services';

import {addGuestMutation,removeGuestMutation} from '../../../../models/event.model';

@Component({
    selector: 'event-details-add-guest-button',
    template,
    styles: [style]
})
export class EventDetailsAddGuestButtonComponent {
    @Input() @Output() event: any;
    user: any;
    loading:true;
    private isComing: true;
    constructor(private eventService: EventService, private userService: UserService) {
        userService.getCurrentUser().subscribe(user => {
            this.user = user;
        });
        eventService.isComing().subscribe(coming => this.isComing = coming);

    }
    private isNotComing(): boolean {
        return !this.isComing;
    }
    addGuest() {
        this.eventService.addGuest(this.user);
    }

    removeGuest() {
        this.eventService.removeGuest(this.user);
    }
}
