import { Component, OnInit, Input } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { MdDialogRef } from '@angular/material';
import * as _ from 'lodash';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventCollection } from '../../../../../../both/collections/event.collection';
import { Categorie } from '../../../../../../both/models/';
import { JmEvent } from '../../../../models';
import { EventService } from '../../../../services/services';
import template from './add.component.html';
import style from './add.component.scss';


@Component({
    selector: 'event-add',
    styles: [style],
    template
})
export class EventAddComponent implements OnInit {
    updating: boolean = false;
    categorie: Categorie;
    date: Date;
    addForm: FormGroup;
    jmEvent: any;
    constructor(
        public dialogRef: MdDialogRef<EventAddComponent>,
        private formBuilder: FormBuilder,
        private eventService: EventService) {
    }
    ngOnInit() {
        if (this.dialogRef.config.data && this.dialogRef.config.data.jmEvent) {
            this.jmEvent = this.dialogRef.config.data.jmEvent;
            this.date = this.jmEvent.date;
            this.updating = true;
        } else {
            this.jmEvent = new JmEvent();
        }

        this.addForm = this.formBuilder.group({
            date: [this.date],
            title: [this.jmEvent.title, Validators.required],
            description: [this.jmEvent.description],
            location: [this.jmEvent.location, Validators.required]

        });
    }
    addEvent(): void {
        if (!Meteor.userId()) {
            alert('Please log in to add a event');
            return;
        }
        const jmEvent = this.assembleData();

        if (this.updating) {
            this.eventService.updateEvent(this.jmEvent._id, jmEvent);
        } else {
            this.eventService.addEvent(jmEvent);
        }
        this.addForm.reset();
        this.dialogRef.close();
    }
    onCategorieSelected(categorie: Categorie) {
        this.categorie = categorie;
    }

   
    private assembleData(): any {
        let jmEvent = Object.assign({},
            this.addForm.value,
            { date: this.date },
            { organisatorids: [Meteor.userId()] });

        if (this.categorie) {
            jmEvent = Object.assign(
                jmEvent,
                { categorie: this.categorie.name },
                { picture: this.categorie.imageLarge }
            );
        } else {
            jmEvent = Object.assign(
                jmEvent,
                { categorie: this.jmEvent.categorie },
                { picture: this.jmEvent.picture }
            );
        }
        return jmEvent;

    }
}
