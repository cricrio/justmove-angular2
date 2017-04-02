import {Component, OnInit} from '@angular/core';
import {Meteor} from 'meteor/meteor';
import {MdDialogRef} from '@angular/material';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {EventCollection} from '../../../../../../both/collections/event.collection';
import {Categorie, JmEvent} from '../../../../../../both/models/';

import {EventService} from '../../../../services/services';
import template from './add.component.html';
import style from './add.component.scss';


@Component({
    selector: 'event-add',
    styles: [style],
    template
})
export class EventAddComponent implements OnInit {
    categorie: Categorie;
    date: Date;
    addForm: FormGroup;
    constructor(
      public dialogRef: MdDialogRef<EventAddComponent>,
      private formBuilder: FormBuilder,
      private eventService: EventService) {
    }
    ngOnInit() {

        this.addForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: [],
            location: ['', Validators.required]

        });
    }
    addEvent(): void {
        if (!Meteor.userId()) {
            alert('Please log in to add a event');
            return;
        }
        
        this.eventService.addEvent(Object.assign({},
            this.addForm.value,
            { owner: Meteor.userId() },
            { date: this.date },
            { categorie: this.categorie.name },
            { picture: this.categorie.imageLarge },
            { organisatorids: [Meteor.userId()] }));

        this.addForm.reset();
        this.dialogRef.close();

    }
    onCategorieSelected(categorie: Categorie) {
        this.categorie = categorie;
    }
}
