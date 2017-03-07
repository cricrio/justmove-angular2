import {Component, Input} from '@angular/core';
import {Meteor} from 'meteor/meteor';
// import * as _ from '_'
import template from './addGuestButton.component.html';
import style from './addGuestButton.component.scss';

@Component({
    selector: 'event-details-add-guest-button',
    template,
    styles: [style]
})
export class EventDetailsAddGuestButtonComponent {
    @Input() jMevent: any;
    constructor() { }
    private isComing() : boolean{
      return false;
    }

}
