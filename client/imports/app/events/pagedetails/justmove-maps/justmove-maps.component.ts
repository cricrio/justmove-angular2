import {Component} from '@angular/core';
import template from './justmove-maps.component.html';
import style from './justmove-maps.component.scss';

@Component({
  selector: 'justmove-maps',
  styles: [style],
  template
})
export class JustmoveMapsComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;
  mapReady($event){
    console.log($event);
  }
}
