import {Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {ApolloQueryObservable} from 'apollo-angular';

import template from './details.component.html';
import style from './details.component.scss';


import {EventService} from '../../../../services/services';

@Component({
    selector: 'event-details',
    template,
    styles: [style],
})
export class EventDetailsComponent implements OnInit, OnDestroy {

    public event: any;
    public guestsid: string[];
    public loading: boolean;
    private eventId: Subject<string> = new Subject<string>();
    private eventSub: Subscription;
    private eventObs: BehaviorSubject<any>;


    constructor(
        private route: ActivatedRoute,
        private eventService: EventService
    ) { }

    ngOnInit() {


        this.route.params
            .map(params => params['eventId'])
            .subscribe(eventId => {

                this.eventObs = this.eventService.setCurrentEvent(eventId);
                this.eventSub = this.eventObs.subscribe(event => {
                    this.event = event;
                    console.log(event);
                })
            })
    }
    ngOnDestroy() {
        this.eventSub.unsubscribe();
    }
}
