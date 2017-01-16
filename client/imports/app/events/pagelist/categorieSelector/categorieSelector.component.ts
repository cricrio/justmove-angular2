import {Component,OnInit,Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Categorie,Event} from '../../../../../../both/models';
import {CategorieDataService} from '../../categorie-data.service';


import style from './categorieSelector.component.scss';
import template from './categorieSelector.component.html';

@Component({
  selector : 'event-categorie-selector',
  styles : [style],
  template
})
export class EventCategorieSelectorComponent implements OnInit{
    categories: Observable<Categorie[]>;
    categorieEvent : Categorie;
    showChange: boolean;

    constructor(private categorieDataService : CategorieDataService){}
    ngOnInit(){
      this.categories = this.categorieDataService.getData();
    }
    setCategorieEvent(categorie : Categorie) {

        this.categorieEvent = categorie;

        this.event.categorie = categorie.name;
        this.event.picture = categorie.imageLarge;
    }
    showList() {
      console.log("polal");
        return ! this.categorieEvent;
    }
    showImage() {
        return !!this.categorieEvent && !this.showChange;
    }
    setShowChangeImage() {
        this.showChange = true;
    }
    showChangeImage() {
        return this.showChange;
    }
}
