import {Component} from '@angular/core';
import {MdDialog,MdDialogRef} from "@angular/material";
import {EventAddComponent} from '../add/add.component';
import template from './addButton.component.html';
import style from './addButton.component.scss';

@Component({
  selector : 'event-add-button',
  styles :[style],
  template
})
export class EventAddButtonComponent{
  dialogRef: MdDialogRef<any>;

  constructor(public dialog: MdDialog){

  }
  openDialog(){
    this.dialogRef = this.dialog.open(EventAddComponent, {
          width : "75%",
          position : 'bottom',
          disableClose: false
        });
  }
}
