import {Component,Input} from '@angular/core';
import template from './user.component.html';
import style from './user.component.scss';

@Component({
  selector : 'event-user',
  template,
  styles : [style]
})
export class EventUserComponent{
  @Input() user : any;
  constructor(){}

}
