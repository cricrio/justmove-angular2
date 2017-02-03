import {Component,Input} from '@angular/core';
import template from './listUser.component.html';
import style from './listUser.component.scss';

@Component({
  selector : 'event-list-users',
  template,
  styles : [style]
})
export class EventListUserComponent{
  @Input() users : any[];

}
