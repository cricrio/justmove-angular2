import {Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import {MessageCollection} from '../../../../../../both/collections/message.collection'; Component
import {Message} from '../../../../../../both/models/message.model';
import template from './detailsMessageRoom.component.html';
import style from './detailsMessageRoom.component.scss';

@Component({
    selector: 'event-details-message-room',
    template,
    styles: [style]
})
export class EventDetailsMessageRoomComponent implements OnInit {
    @Input() event: any;
    messageForm: FormGroup;
    messages: Observable<Message[]>;
    messagesSub: Subscription;
    constructor(private formBuilder: FormBuilder) {

    }
    ngOnInit() {
        this.messageForm = this.formBuilder.group({
            text: ['', Validators.required]
        });


        this.messagesSub = MeteorObservable.subscribe('messages', this.event._id).subscribe(() => {
            this.messages = MessageCollection.find({  }).zone();
        });


    }
    addMessage(): void {
        if (!Meteor.userId()) {
            alert('Please log in to add a party');
            return;
        }
        console.log("this.messageForm.value.text ");
        console.log(this.messageForm.value.text);
        MessageCollection.insert(Object.assign({},
            { eventid: this.event._id },
            { text: this.messageForm.value.text },
            { owner: Meteor.userId() },
            { date: new Date() }
        )
        );

        this.messageForm.reset();


    }
}
