import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {EventCollection} from '../../../../../../both/collections/event.collection';
import {Categorie,JmEvent} from '../../../../../../both/models/';
import template from './add.component.html';
import style from './add.component.scss';


@Component({
    selector: 'event-add',
    styles: [style],
    template
})
export class EventAddComponent implements OnInit {
    categorie: Categorie;
    poloc : JmEvent;
    date : Date;
    addForm: FormGroup;
    constructor(public dialogRef: MdDialogRef<EventAddComponent>, private formBuilder: FormBuilder) {
    }
    ngOnInit() {

        this.addForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: [],
            location: ['', Validators.required]

        });
    }
    addEvent() {

        this.addForm.value.date = this.date;
        this.addForm.value.categorie = this.categorie.name;
        this.addForm.value.picture = this.categorie.imageLarge;
        EventCollection.insert(this.addForm.value);
        this.addForm.reset();
        this.dialogRef.close();

    }
    onCategorieSelected(categorie: Categorie) {
        this.categorie = categorie;
    }
}
