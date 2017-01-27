import {Component, Input} from '@angular/core';
import * as moment from 'moment';

import template from './date.component.html';
import style from './date.component.scss';

@Component({
    selector: 'event-date',
    template,
    styles: [style]
})
export class EventDateComponent {
    @Input() date: Date;
    month: String;
    day: String;


    showMonth() { return moment(this.date).format('MMM').toUpperCase(); }
    showDay() { return moment(this.date).format('Do'); }
}
