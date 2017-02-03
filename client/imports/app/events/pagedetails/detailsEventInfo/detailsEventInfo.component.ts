import {Component,Input} from '@angular/core';
import template from './detailsEventInfo.component.html';
import style from './detailsEventInfo.component.scss';

@Component(
    {
        selector: 'event-details-info',
        template,
        styles: [style]
    }
)
export class EventDetailsInfoComponent {
  @Input() event: any;
  constructor(){}

}
