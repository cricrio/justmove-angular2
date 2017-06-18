import { Component, OnInit,Input } from '@angular/core';
import template from './justmove-calendar.component.html';
import style from './justmove-calendar.component.scss';

import * as Moment from 'moment';
Moment.locale('fr');



class JmDay{
  constructor(public label , public activate: boolean = false){

  }
}

@Component({
  selector: 'app-justmove-calendar',
  template,
  styles: [style]
})
export class JustmoveCalendarComponent implements OnInit {
  @Input() date : number ;
  weeks;
  month : string;
  day : number;
  time : string;

  constructor() { 
    this.date = Date.now()
    this.time = Moment(this.date).format("h:mm");
  }


private _isMoveDay(label){
    return label == Moment(this.date)
}
private _getCalendarView() {
    const offset = Moment(this.date).date(1).weekday() + 1;
    const lastDayOfMonth = Moment(this.date).daysInMonth();
    const weeks = [[]];
    const moveDate = Moment(this.date).date();
    for (let i = 1,cell = 0; i < lastDayOfMonth + offset; i++,cell ++) {
        if (cell == 7) {
            weeks.push([]);
            cell = 0;
        }
        const label = i >= offset ? i - offset + 1 : '';
        const isMoveDate = label == moveDate;
        weeks[weeks.length - 1].push(new JmDay(label,isMoveDate));

    }
    console.log(weeks);
    return weeks;
}



  ngOnInit() {
    this.weeks = this._getCalendarView();
    this.month = Moment(this.date).format('MMMM YYYY')
    console.log(this.weeks);
  }

}
