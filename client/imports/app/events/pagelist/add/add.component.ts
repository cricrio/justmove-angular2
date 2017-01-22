import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {EventCollection} from '../../../../../../both/collections/event.collection';
import {Categorie} from '../../../../../../both/models/';
import template from './add.component.html';
import style from './add.component.scss';


@Component({
    selector: 'event-add',
    styles: [style],
    template
})
export class EventAddComponent implements OnInit {
    categorie : Categorie;
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
    onCategorieSelected(categorie : Categorie){
      this.addForm.value.categorie = categorie.name;
      this.addForm.value.picture = categorie.imageLarge;
      console.log(this.addForm.value);
    }
}
