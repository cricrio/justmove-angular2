import {EventCollection} from '../../../../both/collections/event.collection';
import {JmEvent} from '../../../../both/models/event.model';

import { Injectable } from "@angular/core";
import { ObservableCursor } from "meteor-rxjs";

@Injectable()
export class EventDataService {
    private data: ObservableCursor<JmEvent>;

    constructor() {
        this.data = EventCollection.find({});
    }

    public addEvent(event : JmEvent) : void {
        EventCollection.insert(event);
    }
    public getData(): ObservableCursor<JmEvent> {
        return this.data;
    }

}
