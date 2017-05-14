import {Component,Input} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {MdDialog,MdDialogRef} from "@angular/material";

import template from './updateEventButton.component.html';


import {EventService} from '../../../../services/event.service';

import {EventAddComponent} from '../../pagelist/add/add.component';


@Component({
    selector: 'event-update-button',
    template,
})
export class EventUpdateButton{
    dialogRef: MdDialogRef<any>;
    constructor(private eventService: EventService,public dialog: MdDialog){

    }
    isEventOfUser():boolean{
        return this.eventService.isEventOfUser();
    }
    openDialog(){
        console.log(this.eventService.getCurrentEventValue());
    this.dialogRef = this.dialog.open(EventAddComponent, {
          width : "75%",
          disableClose: false,
          data:{
              jmEvent : this.eventService.getCurrentEventValue()
          }
        });
  }
}
