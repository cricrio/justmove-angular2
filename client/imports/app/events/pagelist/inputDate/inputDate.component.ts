import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import template from './inputDate.component.html';
import style from './inputDate.component.scss';

@Component({
  selector : 'event-input-date',
  template,
  styles : [style]
})
export class EventInputDateComponent{
  date :Date;
  time : Date;
}
