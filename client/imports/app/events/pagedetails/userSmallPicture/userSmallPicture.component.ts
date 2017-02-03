import {Component,Input} from '@angular/core';
import template from './userSmallPicture.component.html';
import style from './userSmallPicture.component.scss';

@Component({
  selector : 'user-small-picture',
  template,
  styles : [style]
})
export class UserSmallPictureComponent{
  @Input() user;
  constructor(){}
}
