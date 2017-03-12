import {Component,Input,OnInit} from '@angular/core';
import {Categorie, JmEvent} from '../../../../../../both/models';
import template from './card.component.html';
import style from './card.component.scss';

@Component({
  selector : 'event-card',
  styles: [style],
  template
})
export class EventCardComponent {
  @Input() event: JmEvent;

}
