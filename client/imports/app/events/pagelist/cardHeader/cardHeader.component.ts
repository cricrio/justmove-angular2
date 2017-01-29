import {Component,Input} from '@angular/core';
import template from './cardHeader.component.html';
import style from './cardHeader.component.scss';

@Component({
  selector: 'event-card-header',
  styles : [style],
  template
})
export class EventCardHeaderComponent{
  @Input() event :Event;
  constructor(){}
}
