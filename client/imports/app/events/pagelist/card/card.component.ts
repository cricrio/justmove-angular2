import {Component,Input,OnInit} from '@angular/core';
import {Categorie, JmEvent} from '../../../../../../both/models';
import template from './card.component.html';
import style from './card.component.scss';

@Component({
  selector : 'event-card',
  styles: [style],
  template
})
export class EventCardComponent implements OnInit{
  @Input() event: JmEvent;
  constructor(){}
  ngOnInit(){
    console.log(this.event);
  }
}
