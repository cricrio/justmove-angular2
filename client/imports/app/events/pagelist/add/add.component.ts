import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {EventCollection} from '../../../../../../both/collections/event.collection';
import template from './add.component.html';
import style from './add.component.scss';


@Component({
    selector: 'event-add',
    styles: [style],
    template
})
export class EventAddComponent implements OnInit {

    addForm: FormGroup;
    constructor(public dialogRef: MdDialogRef<EventAddComponent>, private formBuilder: FormBuilder){
    }
    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [],
            location: ['', Validators.required],
        });
    }
    addEvent(){
        EventCollection.insert(this.addForm.value);
        this.addForm.reset();
        this.dialogRef.close();
    }
}
