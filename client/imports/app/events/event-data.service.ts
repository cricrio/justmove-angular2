import {EventCollection} from '../../../../both/collections/event.collection';
import {Event} from '../../../../both/models/event.model';

import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";

@Injectable()
export class EventDataService {
    private data: ObservableCursor<Event>;

    constructor() {
        this.data = EventCollection.find({});
    }

    public addEvent(event : Event) : void {
        EventCollection.insert(event);
    }
    public getData(): ObservableCursor<Event> {
        return this.data;
    }

}
