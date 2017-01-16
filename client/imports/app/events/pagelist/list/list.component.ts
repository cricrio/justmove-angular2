import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {EventDataService} from '../../event-data.service';
import {Event} from '../../../../../../both/models/event.model';
import template from './list.component.html';

@Component({
  selector : 'event-list',
  template,
})
export class EventsListComponent implements OnInit{
  events: Observable<Event[]>;

  constructor(private eventDataService: EventDataService) {

  }

  ngOnInit() {
    this.events = this.eventDataService.getData().zone();
  }
}
